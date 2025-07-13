-- 매칭 제안을 저장할 테이블 생성
CREATE TABLE public.match_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposer_id UUID NOT NULL, -- 매칭을 받는 사람 (신청서 제출자)
  proposed_match_id UUID NOT NULL, -- 제안되는 매칭 상대방
  admin_id UUID NOT NULL, -- 매칭을 제안한 관리자
  status TEXT NOT NULL DEFAULT 'pending', -- pending, accepted, rejected
  admin_message TEXT, -- 관리자가 남긴 메시지
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_proposer FOREIGN KEY (proposer_id) REFERENCES public.applications(user_id),
  CONSTRAINT fk_proposed_match FOREIGN KEY (proposed_match_id) REFERENCES public.applications(user_id)
);

-- RLS 정책 활성화
ALTER TABLE public.match_proposals ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신에게 제안된 매칭만 볼 수 있음
CREATE POLICY "Users can view their own match proposals"
ON public.match_proposals
FOR SELECT
USING (auth.uid() = proposer_id);

-- 사용자는 자신에게 제안된 매칭의 상태만 업데이트할 수 있음
CREATE POLICY "Users can update their own match proposal status"
ON public.match_proposals
FOR UPDATE
USING (auth.uid() = proposer_id)
WITH CHECK (auth.uid() = proposer_id);

-- 관리자는 모든 매칭 제안을 볼 수 있음 (나중에 관리자 권한 시스템 구현시 수정)
CREATE POLICY "Allow all authenticated users to view match proposals for admin"
ON public.match_proposals
FOR SELECT
TO authenticated
USING (true);

-- 관리자는 매칭 제안을 생성할 수 있음
CREATE POLICY "Allow all authenticated users to create match proposals for admin"
ON public.match_proposals
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 관리자는 매칭 제안을 업데이트할 수 있음
CREATE POLICY "Allow all authenticated users to update match proposals for admin"
ON public.match_proposals
FOR UPDATE
TO authenticated
USING (true);

-- 업데이트 시간 자동 갱신 트리거
CREATE TRIGGER update_match_proposals_updated_at
BEFORE UPDATE ON public.match_proposals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();