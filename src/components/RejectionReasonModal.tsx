import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RejectionReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchProposalId: string;
  onComplete: () => void;
}

const RejectionReasonModal = ({ isOpen, onClose, matchProposalId, onComplete }: RejectionReasonModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [additionalComments, setAdditionalComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const rejectionCategories = [
    { value: 'age', label: '나이가 맞지 않음' },
    { value: 'occupation', label: '직업이 맞지 않음' },
    { value: 'education', label: '학력이 맞지 않음' },
    { value: 'location', label: '지역이 맞지 않음' },
    { value: 'personality', label: '성격이 맞지 않을 것 같음' },
    { value: 'hobbies', label: '취미가 맞지 않음' },
    { value: 'appearance', label: '외모 관련' },
    { value: 'family', label: '가족 배경 관련' },
    { value: 'religion', label: '종교 관련' },
    { value: 'lifestyle', label: '라이프스타일이 맞지 않음' },
    { value: 'other', label: '기타' }
  ];

  const handleSubmit = async () => {
    if (!selectedCategory) {
      toast({
        title: "선택 필요",
        description: "거절 이유를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (selectedCategory === 'other' && !customReason) {
      toast({
        title: "상세 이유 필요",
        description: "기타를 선택한 경우 상세 이유를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const reason = selectedCategory === 'other' ? customReason : 
        rejectionCategories.find(cat => cat.value === selectedCategory)?.label || '';

      const { error } = await supabase
        .from('match_rejections')
        .insert({
          match_proposal_id: matchProposalId,
          user_id: user.user.id,
          rejection_reason: reason,
          rejection_category: selectedCategory,
          additional_comments: additionalComments || null
        });

      if (error) throw error;

      toast({
        title: "거절 이유 제출 완료",
        description: "의견을 제출해주셔서 감사합니다.",
      });

      onComplete();
      onClose();
    } catch (error) {
      console.error('Error submitting rejection reason:', error);
      toast({
        title: "오류",
        description: "거절 이유 제출 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedCategory('');
    setCustomReason('');
    setAdditionalComments('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>거절 이유를 알려주세요</DialogTitle>
          <DialogDescription>
            더 나은 매칭 서비스를 위해 거절 이유를 알려주시면 도움이 됩니다. (선택사항)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold">주요 거절 이유</Label>
            <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory} className="mt-3">
              {rejectionCategories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.value} id={category.value} />
                  <Label htmlFor={category.value} className="text-sm cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedCategory === 'other' && (
            <div>
              <Label htmlFor="customReason">상세 이유</Label>
              <Textarea
                id="customReason"
                placeholder="상세한 거절 이유를 입력해주세요"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-2"
              />
            </div>
          )}

          <div>
            <Label htmlFor="additionalComments">추가 의견 (선택사항)</Label>
            <Textarea
              id="additionalComments"
              placeholder="개선 사항이나 추가 의견이 있으시면 자유롭게 작성해주세요"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              건너뛰기
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? "제출 중..." : "제출하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectionReasonModal;