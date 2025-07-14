import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, X, MapPin, Briefcase, Calendar, Clock, Users, CheckCircle, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import RejectionReasonModal from "@/components/RejectionReasonModal";

interface MatchProposal {
  id: string;
  proposer_id: string;
  proposed_match_id: string;
  admin_id: string;
  status: string;
  final_status: string;
  proposer_response: string;
  proposed_match_response: string;
  expires_at: string;
  admin_message?: string;
  created_at: string;
  updated_at: string;
  proposed_match_info?: any;
  is_proposer?: boolean;
  user_response_status?: string;
  other_response_status?: string;
}

const Matching = () => {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [decision, setDecision] = useState<string | null>(null);
  const [userApplication, setUserApplication] = useState<any>(null);
  const [matchProposals, setMatchProposals] = useState<MatchProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectedMatchId, setRejectedMatchId] = useState<string>('');
  const [userResponse, setUserResponse] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadUserApplication();
  }, []);

  useEffect(() => {
    if (userApplication) {
      loadMatchProposals();
    }
  }, [userApplication]);

  const loadUserApplication = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        navigate('/login');
        return;
      }

      const { data: application, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('status', 'submitted')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setUserApplication(null);
        } else {
          throw error;
        }
      } else {
        setUserApplication(application);
      }
    } catch (error) {
      console.error('Error loading user application:', error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "사용자 신청서를 불러오는 중 오류가 발생했습니다."
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMatchProposals = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // 사용자가 제안자이거나 제안받은 대상인 매칭들을 모두 가져옴
      const { data: proposals, error } = await supabase
        .from('match_proposals')
        .select('*')
        .or(`proposer_id.eq.${user.user.id},proposed_match_id.eq.${user.user.id}`)
        .in('final_status', ['pending'])
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // 각 제안에 대한 상대방 정보와 사용자의 응답 상태 로드
      const proposalsWithDetails = await Promise.all(
        (proposals || []).map(async (proposal) => {
          const isProposer = proposal.proposer_id === user.user.id;
          const otherUserId = isProposer ? proposal.proposed_match_id : proposal.proposer_id;
          
          // 상대방 정보 가져오기
          const { data: application } = await supabase
            .from('applications')
            .select('*')
            .eq('user_id', otherUserId)
            .single();

          // 사용자의 응답 상태 확인
          const userResponseStatus = isProposer ? proposal.proposer_response : proposal.proposed_match_response;
          
          return {
            ...proposal,
            proposed_match_info: application,
            is_proposer: isProposer,
            user_response_status: userResponseStatus,
            other_response_status: isProposer ? proposal.proposed_match_response : proposal.proposer_response
          };
        })
      );

      setMatchProposals(proposalsWithDetails);
      
      // 사용자 응답 상태 설정
      const responseStatus: {[key: string]: string} = {};
      proposalsWithDetails.forEach(proposal => {
        responseStatus[proposal.id] = proposal.user_response_status;
      });
      setUserResponse(responseStatus);

    } catch (error) {
      console.error('Error loading match proposals:', error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "매칭 제안을 불러오는 중 오류가 발생했습니다."
      });
    }
  };

  const handleDecision = async (choice: 'accept' | 'reject') => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const currentMatchData = matchProposals[currentMatch];
      const isProposer = currentMatchData.is_proposer;
      
      // 사용자의 응답 업데이트
      const updateData = isProposer 
        ? { proposer_response: choice === 'accept' ? 'accepted' : 'rejected' }
        : { proposed_match_response: choice === 'accept' ? 'accepted' : 'rejected' };

      const { error } = await supabase
        .from('match_proposals')
        .update(updateData)
        .eq('id', currentMatchData.id);

      if (error) throw error;

      // 응답 히스토리 기록
      const { error: responseError } = await supabase
        .from('match_responses')
        .insert({
          match_proposal_id: currentMatchData.id,
          user_id: user.user.id,
          response: choice === 'accept' ? 'accepted' : 'rejected'
        });

      if (responseError) throw responseError;

      setDecision(choice);
      setUserResponse(prev => ({
        ...prev,
        [currentMatchData.id]: choice === 'accept' ? 'accepted' : 'rejected'
      }));
      
      if (choice === 'accept') {
        toast({
          title: "매칭 수락",
          description: "상대방의 응답을 기다리고 있습니다."
        });
      } else {
        // 거절 이유 수집 모달 표시
        setRejectedMatchId(currentMatchData.id);
        setShowRejectionModal(true);
      }

      // 상태 새로고침
      setTimeout(loadMatchProposals, 1000);
      
    } catch (error) {
      console.error('Error updating match proposal:', error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "매칭 응답 중 오류가 발생했습니다."
      });
    }
  };

  const handleRejectionComplete = () => {
    toast({
      title: "매칭 거절",
      description: "거절 이유가 기록되었습니다."
    });
    
    // 다음 매칭으로 이동
    if (currentMatch < matchProposals.length - 1) {
      setCurrentMatch(currentMatch + 1);
      setDecision(null);
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffMs = expiry.getTime() - now.getTime();
    
    if (diffMs <= 0) return "만료됨";
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}일 ${hours % 24}시간 남음`;
    }
    
    return `${hours}시간 ${minutes}분 남음`;
  };

  const getMatchStatus = (proposal: any) => {
    const userResponse = proposal.user_response_status;
    const otherResponse = proposal.other_response_status;
    
    if (userResponse === 'accepted' && otherResponse === 'accepted') {
      return { type: 'matched', message: '매칭 성사! 결제를 진행하세요.' };
    } else if (userResponse === 'rejected' || otherResponse === 'rejected') {
      return { type: 'rejected', message: '매칭이 거절되었습니다.' };
    } else if (userResponse === 'accepted') {
      return { type: 'waiting', message: '상대방의 응답을 기다리고 있습니다.' };
    } else if (otherResponse === 'accepted') {
      return { type: 'pending', message: '상대방이 수락했습니다. 응답해주세요!' };
    } else {
      return { type: 'pending', message: '새로운 매칭 제안입니다.' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">매칭 정보를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!userApplication) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">신청서를 먼저 제출해주세요</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  매칭을 받기 위해서는 먼저 신청서를 작성하고 제출해야 합니다.
                </p>
                <Link to="/application">
                  <Button size="lg">신청서 작성하기</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (matchProposals.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">현재 매칭 제안이 없습니다</CardTitle>
              </CardHeader>
              <CardContent>
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">
                  아직 새로운 매칭 제안이 없습니다. 곧 좋은 소식이 있을 거예요!
                </p>
                <div className="space-y-3">
                  <Link to="/match-status">
                    <Button variant="outline" className="w-full">매칭 상태 확인</Button>
                  </Link>
                  <Link to="/application">
                    <Button variant="ghost" className="w-full">신청서 수정하기</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentMatchData = matchProposals[currentMatch];
  const matchInfo = currentMatchData?.proposed_match_info;
  const matchStatus = getMatchStatus(currentMatchData);
  const timeRemaining = getTimeRemaining(currentMatchData.expires_at);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 상태 알림 */}
          <Alert className="mb-6">
            <Clock className="h-4 w-4" />
            <AlertDescription>
              <div className="flex justify-between items-center">
                <span>{matchStatus.message}</span>
                <Badge variant={timeRemaining.includes('만료') ? 'destructive' : 'secondary'}>
                  {timeRemaining}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          {/* 매칭된 경우 결제 버튼 */}
          {matchStatus.type === 'matched' && (
            <div className="mb-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">매칭 성사!</span>
                    </div>
                    <Button 
                      onClick={() => navigate(`/payment?match_id=${currentMatchData.id}`)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      결제하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 매칭 카드 */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-600" />
                  <span className="text-sm text-gray-500">
                    매칭 {currentMatch + 1} / {matchProposals.length}
                  </span>
                </div>
                <Badge variant="outline">
                  {currentMatchData.is_proposer ? '내가 제안한 매칭' : '받은 매칭 제안'}
                </Badge>
              </div>
              
              <CardTitle className="text-center text-2xl text-gray-800">
                {matchInfo?.name} ({matchInfo?.age}세)
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentMatchData.admin_message && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>관리자 메시지:</strong> {currentMatchData.admin_message}
                  </p>
                </div>
              )}

              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{matchInfo?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{matchInfo?.occupation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{matchInfo?.age}세</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{matchInfo?.education}</span>
                </div>
              </div>

              {/* 취미 */}
              {matchInfo?.hobbies && matchInfo.hobbies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">취미</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchInfo.hobbies.map((hobby: string, index: number) => (
                      <Badge key={index} variant="secondary">{hobby}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 자기소개 */}
              {matchInfo?.introduction && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">자기소개</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {matchInfo.introduction}
                  </p>
                </div>
              )}

              {/* 응답 버튼 */}
              {userResponse[currentMatchData.id] === 'pending' && matchStatus.type === 'pending' && (
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => handleDecision('reject')}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    거절하기
                  </Button>
                  <Button
                    onClick={() => handleDecision('accept')}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    수락하기
                  </Button>
                </div>
              )}

              {/* 응답 완료 상태 */}
              {userResponse[currentMatchData.id] !== 'pending' && (
                <div className="pt-4 text-center">
                  <Badge 
                    variant={userResponse[currentMatchData.id] === 'accepted' ? 'default' : 'destructive'}
                    className="text-sm"
                  >
                    {userResponse[currentMatchData.id] === 'accepted' ? '수락함' : '거절함'}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 네비게이션 */}
          {matchProposals.length > 1 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentMatch(Math.max(0, currentMatch - 1))}
                disabled={currentMatch === 0}
              >
                이전 매칭
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentMatch(Math.min(matchProposals.length - 1, currentMatch + 1))}
                disabled={currentMatch === matchProposals.length - 1}
              >
                다음 매칭
              </Button>
            </div>
          )}
        </div>
      </div>

      <RejectionReasonModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        matchProposalId={rejectedMatchId}
        onComplete={handleRejectionComplete}
      />
    </div>
  );
};

export default Matching;