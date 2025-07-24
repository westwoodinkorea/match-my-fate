import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Clock, CheckCircle, XCircle, CreditCard, MessageCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface MatchWithDetails {
  id: string;
  status: string;
  created_at: string;
  admin_message?: string;
  applications?: {
    name: string;
    age: number;
    occupation: string;
    hobbies: string[];
  };
  match_payments?: {
    payment_status: string;
    amount: number;
    paid_at?: string;
  }[];
  contact_exchanges?: {
    exchange_status: string;
    proposer_contact?: string;
    proposed_match_contact?: string;
    exchanged_at?: string;
  }[];
}

const MatchStatus = () => {
  const [matches, setMatches] = useState<MatchWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContacts, setShowContacts] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data: proposals, error } = await supabase
        .from('match_proposals')
        .select(`
          id,
          status,
          created_at,
          admin_message,
          proposed_match_id,
          match_payments(payment_status, amount, paid_at),
          contact_exchanges(exchange_status, proposer_contact, proposed_match_contact, exchanged_at)
        `)
        .eq('proposer_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get application details for each proposal
      const matchesWithDetails = await Promise.all(
        (proposals || []).map(async (proposal) => {
          const { data: application } = await supabase
            .from('applications')
            .select('name, age, occupation, hobbies')
            .eq('user_id', proposal.proposed_match_id)
            .single();

          return {
            ...proposal,
            applications: application
          };
        })
      );

      setMatches(matchesWithDetails);
    } catch (error) {
      console.error('Error loading matches:', error);
      toast({
        title: "오류",
        description: "매칭 정보를 불러오는 중 오류가 발생했습니다.",
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

  const toggleContactVisibility = (matchId: string) => {
    setShowContacts(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));
  };


  const handleContactExchange = (matchId: string) => {
    navigate(`/contact-exchange?match_id=${matchId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">매칭 상태를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">매칭 상태</h1>
          <p className="text-gray-600">현재 진행 중인 매칭들을 확인하세요</p>
        </div>

        {matches.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">진행 중인 매칭이 없습니다</h3>
              <p className="text-gray-500 mb-6">새로운 매칭을 기다려주세요</p>
              <Button onClick={() => navigate('/matching')}>
                매칭 확인하기
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <Card key={match.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {match.applications?.name} ({match.applications?.age}세)
                        {getStatusBadge(match.status)}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {match.applications?.occupation}
                      </CardDescription>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(match.created_at).toLocaleDateString('ko-KR')}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {match.admin_message && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>관리자 메시지:</strong> {match.admin_message}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* 연락처 교환 정보 */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">연락처 교환</h4>
                      {match.contact_exchanges && match.contact_exchanges.length > 0 ? (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">
                              {match.contact_exchanges[0].exchange_status === 'completed' ? '교환완료' : '대기중'}
                            </span>
                            {match.contact_exchanges[0].proposer_contact && match.contact_exchanges[0].proposed_match_contact && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => toggleContactVisibility(match.id)}
                              >
                                {showContacts[match.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                            )}
                          </div>
                          {showContacts[match.id] && (
                            <div className="space-y-1 text-xs">
                              {match.contact_exchanges[0].proposed_match_contact && (
                                <p className="text-gray-600">
                                  상대방: {match.contact_exchanges[0].proposed_match_contact}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">연락처 교환 대기</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* 액션 버튼들 */}
                  <div className="flex gap-2 flex-wrap">
                    {match.status === 'accepted' && !match.contact_exchanges?.length && (
                      <Button onClick={() => handleContactExchange(match.id)}>
                        연락처 교환하기
                      </Button>
                    )}

                    {match.status === 'contact_exchanged' && (
                      <Badge variant="outline" className="bg-green-50">
                        매칭 완료! 연락처를 확인하여 대화를 시작하세요
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate('/match-history')}>
            매칭 히스토리 보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchStatus;