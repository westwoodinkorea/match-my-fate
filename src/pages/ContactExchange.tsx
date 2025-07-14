import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Heart, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactExchange = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const matchProposalId = searchParams.get('match_id');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    kakaoId: '',
  });
  const [matchDetails, setMatchDetails] = useState<any>(null);

  useEffect(() => {
    if (matchProposalId) {
      loadMatchDetails();
    }
  }, [matchProposalId]);

  const loadMatchDetails = async () => {
    try {
      const { data: proposal, error } = await supabase
        .from('match_proposals')
        .select(`
          *,
          applications!match_proposals_proposed_match_id_fkey(name, age, occupation, hobbies)
        `)
        .eq('id', matchProposalId)
        .single();

      if (error) throw error;
      setMatchDetails(proposal);
    } catch (error) {
      console.error('Error loading match details:', error);
      toast({
        title: "오류",
        description: "매칭 정보를 불러오는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitContact = async () => {
    if (!contactInfo.phone && !contactInfo.email && !contactInfo.kakaoId) {
      toast({
        title: "연락처 입력 필요",
        description: "최소 하나의 연락처 정보를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const contactData = `전화: ${contactInfo.phone || '미제공'}, 이메일: ${contactInfo.email || '미제공'}, 카카오톡: ${contactInfo.kakaoId || '미제공'}`;

      // Check if contact exchange record exists
      const { data: existing } = await supabase
        .from('contact_exchanges')
        .select('*')
        .eq('match_proposal_id', matchProposalId)
        .single();

      if (existing) {
        // Update existing record
        const updateData = user.user.id === matchDetails?.proposer_id 
          ? { proposer_contact: contactData }
          : { proposed_match_contact: contactData };

        const { error } = await supabase
          .from('contact_exchanges')
          .update(updateData)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new record
        const insertData = {
          match_proposal_id: matchProposalId,
          ...(user.user.id === matchDetails?.proposer_id 
            ? { proposer_contact: contactData }
            : { proposed_match_contact: contactData })
        };

        const { error } = await supabase
          .from('contact_exchanges')
          .insert(insertData);

        if (error) throw error;
      }

      setSubmitted(true);
      toast({
        title: "연락처 제출 완료",
        description: "연락처 정보가 성공적으로 제출되었습니다.",
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      toast({
        title: "오류",
        description: "연락처 제출 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">연락처 제출 완료!</CardTitle>
            <CardDescription>
              상대방도 연락처를 제출하면 서로의 연락처를 확인할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/match-status')} className="w-full">
              매칭 상태 확인하기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <CardTitle className="text-2xl">축하합니다! 매칭이 성사되었습니다</CardTitle>
          <CardDescription>
            서로의 연락처를 교환하여 더 깊은 대화를 시작해보세요
          </CardDescription>
        </CardHeader>
        
        {matchDetails && (
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">매칭 상대방</h3>
              <p className="text-sm text-gray-600">
                {matchDetails.applications?.name} ({matchDetails.applications?.age}세)
              </p>
              <p className="text-sm text-gray-600">{matchDetails.applications?.occupation}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">연락처 정보 입력</h3>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  전화번호
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  이메일
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kakao">카카오톡 ID</Label>
                <Input
                  id="kakao"
                  placeholder="카카오톡 ID"
                  value={contactInfo.kakaoId}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, kakaoId: e.target.value }))}
                />
              </div>
            </div>

            <Button 
              onClick={handleSubmitContact}
              disabled={loading}
              className="w-full"
            >
              {loading ? "제출 중..." : "연락처 제출하기"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              * 최소 하나의 연락처 정보를 입력해주세요
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ContactExchange;