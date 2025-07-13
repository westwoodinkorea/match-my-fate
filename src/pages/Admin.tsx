import React, { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Heart, Calendar } from "lucide-react";

interface Application {
  user_id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  occupation: string;
  education: string;
  religion: string;
  personality: string;
  hobbies: string[];
  introduction: string;
  status: string;
  created_at: string;
}

interface MatchProposal {
  id: string;
  proposer_id: string;
  proposed_match_id: string;
  admin_id: string;
  status: string;
  admin_message: string;
  created_at: string;
  proposer_info: Application;
  proposed_match_info: Application;
}

interface AdminProps {
  user: User | null;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [matchProposals, setMatchProposals] = useState<MatchProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposer, setSelectedProposer] = useState<Application | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<string>("");
  const [adminMessage, setAdminMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      // 제출된 신청서들 로드
      const { data: apps, error: appsError } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'submitted')
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      setApplications(apps || []);

      // 매칭 제안들 로드
      const { data: proposals, error: proposalsError } = await supabase
        .from('match_proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (proposalsError) throw proposalsError;

      // 각 제안에 대해 관련 신청서 정보 별도로 로드
      const enrichedProposals = await Promise.all(
        (proposals || []).map(async (proposal) => {
          const [proposerResult, proposedMatchResult] = await Promise.all([
            supabase.from('applications').select('*').eq('user_id', proposal.proposer_id).single(),
            supabase.from('applications').select('*').eq('user_id', proposal.proposed_match_id).single()
          ]);

          return {
            ...proposal,
            proposer_info: proposerResult.data,
            proposed_match_info: proposedMatchResult.data
          };
        })
      );

      setMatchProposals(enrichedProposals as MatchProposal[]);

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "데이터 로드 중 오류가 발생했습니다."
      });
    } finally {
      setLoading(false);
    }
  };

  const createMatchProposal = async () => {
    if (!selectedProposer || !selectedMatch || !user) return;

    try {
      const { error } = await supabase
        .from('match_proposals')
        .insert({
          proposer_id: selectedProposer.user_id,
          proposed_match_id: selectedMatch,
          admin_id: user.id,
          admin_message: adminMessage
        });

      if (error) throw error;

      toast({
        title: "매칭 제안 완료",
        description: `${selectedProposer.name}님에게 매칭을 제안했습니다.`
      });

      setSelectedProposer(null);
      setSelectedMatch("");
      setAdminMessage("");
      loadData();

    } catch (error) {
      console.error('Error creating match proposal:', error);
      toast({
        variant: "destructive",
        title: "오류",
        description: "매칭 제안 중 오류가 발생했습니다."
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">대기중</Badge>;
      case 'accepted':
        return <Badge variant="default">수락됨</Badge>;
      case 'rejected':
        return <Badge variant="destructive">거절됨</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCompatibleMatches = (targetApp: Application) => {
    return applications.filter(app => 
      app.user_id !== targetApp.user_id && 
      app.gender !== targetApp.gender
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">매칭 관리자 페이지</h1>
          <p className="text-muted-foreground mt-2">신청서를 검토하고 매칭을 제안해보세요.</p>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              신청서 관리 ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="proposals" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              매칭 제안 ({matchProposals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <Card key={app.user_id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{app.name}</span>
                      <Badge variant="outline">{app.gender === 'male' ? '남성' : '여성'}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {app.age}세 • {app.location} • {app.occupation}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">학력</p>
                      <p className="text-sm">{app.education}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">종교</p>
                      <p className="text-sm">{app.religion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">성격</p>
                      <p className="text-sm">{app.personality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">취미</p>
                      <p className="text-sm">{app.hobbies?.join(', ')}</p>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          onClick={() => setSelectedProposer(app)}
                        >
                          매칭 제안하기
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{app.name}님에게 매칭 제안</DialogTitle>
                          <DialogDescription>
                            매칭할 상대방을 선택하고 메시지를 작성해주세요.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="match-select">매칭 상대방</Label>
                            <Select value={selectedMatch} onValueChange={setSelectedMatch}>
                              <SelectTrigger>
                                <SelectValue placeholder="매칭할 상대방을 선택하세요" />
                              </SelectTrigger>
                              <SelectContent>
                                {getCompatibleMatches(app).map((match) => (
                                  <SelectItem key={match.user_id} value={match.user_id}>
                                    {match.name} ({match.age}세, {match.location})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="admin-message">관리자 메시지</Label>
                            <Textarea
                              id="admin-message"
                              placeholder="매칭 이유나 추천 사유를 작성해주세요..."
                              value={adminMessage}
                              onChange={(e) => setAdminMessage(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={createMatchProposal}
                            disabled={!selectedMatch}
                          >
                            매칭 제안 보내기
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="space-y-4">
              {matchProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>
                        {proposal.proposer_info?.name} ↔ {proposal.proposed_match_info?.name}
                      </span>
                      {getStatusBadge(proposal.status)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(proposal.created_at).toLocaleDateString('ko-KR')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">제안 받는 사람</h4>
                        <p>{proposal.proposer_info?.name} ({proposal.proposer_info?.age}세)</p>
                        <p className="text-sm text-muted-foreground">
                          {proposal.proposer_info?.location} • {proposal.proposer_info?.occupation}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">제안된 상대방</h4>
                        <p>{proposal.proposed_match_info?.name} ({proposal.proposed_match_info?.age}세)</p>
                        <p className="text-sm text-muted-foreground">
                          {proposal.proposed_match_info?.location} • {proposal.proposed_match_info?.occupation}
                        </p>
                      </div>
                    </div>
                    {proposal.admin_message && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">관리자 메시지</p>
                        <p className="text-sm">{proposal.admin_message}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;