import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Clock, CheckCircle, XCircle, CreditCard, MessageCircle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface MatchHistoryItem {
  id: string;
  status: string;
  created_at: string;
  admin_message?: string;
  match_name?: string;
  match_age?: number;
  match_occupation?: string;
  rejection_reason?: string;
  rejection_category?: string;
}

const MatchHistory = () => {
  const [allMatches, setAllMatches] = useState<MatchHistoryItem[]>([]);
  const [completedMatches, setCompletedMatches] = useState<MatchHistoryItem[]>([]);
  const [rejectedMatches, setRejectedMatches] = useState<MatchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadMatchHistory();
  }, []);

  const loadMatchHistory = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // 모든 매치 제안 가져오기
      const { data: proposals, error: proposalsError } = await supabase
        .from('match_proposals')
        .select(`
          id,
          status,
          created_at,
          admin_message,
          proposed_match_id
        `)
        .eq('proposer_id', user.user.id)
        .order('created_at', { ascending: false });

      if (proposalsError) throw proposalsError;

      // 각 제안에 대한 상세 정보 가져오기
      const matchesWithDetails = await Promise.all(
        (proposals || []).map(async (proposal) => {
          // 매치 상대방 정보 가져오기
          const { data: application } = await supabase
            .from('applications')
            .select('name, age, occupation')
            .eq('user_id', proposal.proposed_match_id)
            .single();

          // 거절 사유 가져오기 (있는 경우)
          let rejectionInfo = null;
          if (proposal.status === 'rejected') {
            const { data: rejection } = await supabase
              .from('match_rejections')
              .select('rejection_reason, rejection_category')
              .eq('match_proposal_id', proposal.id)
              .eq('user_id', user.user.id)
              .single();
            rejectionInfo = rejection;
          }

          return {
            ...proposal,
            match_name: application?.name,
            match_age: application?.age,
            match_occupation: application?.occupation,
            rejection_reason: rejectionInfo?.rejection_reason,
            rejection_category: rejectionInfo?.rejection_category,
          };
        })
      );

      setAllMatches(matchesWithDetails);
      setCompletedMatches(matchesWithDetails.filter(m => 
        ['completed', 'contact_exchanged', 'payment_completed'].includes(m.status)
      ));
      setRejectedMatches(matchesWithDetails.filter(m => m.status === 'rejected'));
    } catch (error) {
      console.error('Error loading match history:', error);
      toast({
        title: "오류",
        description: "매칭 히스토리를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: '대기중', variant: 'secondary' as const, icon: Clock },
      accepted: { label: '수락됨', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: '거절됨', variant: 'destructive' as const, icon: XCircle },
      payment_pending: { label: '결제대기', variant: 'outline' as const, icon: CreditCard },
      payment_completed: { label: '결제완료', variant: 'default' as const, icon: CheckCircle },
      contact_exchanged: { label: '연락처교환', variant: 'default' as const, icon: MessageCircle },
      completed: { label: '매칭완료', variant: 'default' as const, icon: Heart },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const MatchCard = ({ match }: { match: MatchHistoryItem }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-3">
              {match.match_name || '알 수 없음'} 
              {match.match_age && `(${match.match_age}세)`}
              {getStatusBadge(match.status)}
            </CardTitle>
            <CardDescription className="mt-1">
              {match.match_occupation || '직업 정보 없음'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {new Date(match.created_at).toLocaleDateString('ko-KR')}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {match.admin_message && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>관리자 메시지:</strong> {match.admin_message}
            </p>
          </div>
        )}

        {match.rejection_reason && (
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>거절 사유:</strong> {match.rejection_reason}
            </p>
            {match.rejection_category && (
              <p className="text-xs text-red-600 mt-1">
                카테고리: {match.rejection_category}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">매칭 히스토리를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">매칭 히스토리</h1>
          <p className="text-gray-600">지금까지의 모든 매칭 기록을 확인하세요</p>
        </div>

        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/match-status')}>
            ← 현재 매칭 상태로 돌아가기
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">전체 ({allMatches.length})</TabsTrigger>
            <TabsTrigger value="completed">성사 ({completedMatches.length})</TabsTrigger>
            <TabsTrigger value="rejected">거절 ({rejectedMatches.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {allMatches.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">매칭 히스토리가 없습니다</h3>
                  <p className="text-gray-500">첫 매칭을 시작해보세요</p>
                </CardContent>
              </Card>
            ) : (
              <div>
                {allMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedMatches.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">성사된 매칭이 없습니다</h3>
                  <p className="text-gray-500">아직 완료된 매칭이 없어요</p>
                </CardContent>
              </Card>
            ) : (
              <div>
                {completedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            {rejectedMatches.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <XCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">거절된 매칭이 없습니다</h3>
                  <p className="text-gray-500">모든 매칭이 잘 진행되고 있어요</p>
                </CardContent>
              </Card>
            ) : (
              <div>
                {rejectedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MatchHistory;