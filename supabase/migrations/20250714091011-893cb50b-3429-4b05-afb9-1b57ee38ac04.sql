-- 기존 match_proposals 테이블을 개선하여 양방향 응답 추적
ALTER TABLE public.match_proposals 
ADD COLUMN proposer_response TEXT DEFAULT 'pending', -- pending, accepted, rejected
ADD COLUMN proposed_match_response TEXT DEFAULT 'pending', -- pending, accepted, rejected
ADD COLUMN expires_at TIMESTAMPTZ DEFAULT (now() + interval '48 hours'),
ADD COLUMN final_status TEXT DEFAULT 'pending'; -- pending, matched, failed, expired

-- 기존 status 컬럼의 의미를 변경 - 이제 관리자의 매칭 제안 상태를 나타냄
-- pending: 관리자가 제안함, matched: 양쪽 모두 수락하여 매칭 성사, failed: 한쪽이라도 거절, expired: 시간 초과

-- 매칭 응답 히스토리를 추적하는 테이블 생성
CREATE TABLE public.match_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_proposal_id UUID NOT NULL REFERENCES public.match_proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  response TEXT NOT NULL, -- accepted, rejected
  responded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- match_responses RLS 설정
ALTER TABLE public.match_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own responses" ON public.match_responses
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own responses" ON public.match_responses
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all responses" ON public.match_responses
FOR SELECT USING (public.is_admin());

-- 매칭 상태를 자동으로 업데이트하는 함수
CREATE OR REPLACE FUNCTION public.update_match_status()
RETURNS TRIGGER AS $$
BEGIN
  -- 양쪽 모두 수락한 경우
  IF NEW.proposer_response = 'accepted' AND NEW.proposed_match_response = 'accepted' THEN
    NEW.final_status = 'matched';
    NEW.status = 'payment_pending';
  -- 한쪽이라도 거절한 경우
  ELSIF NEW.proposer_response = 'rejected' OR NEW.proposed_match_response = 'rejected' THEN
    NEW.final_status = 'failed';
    NEW.status = 'rejected';
  -- 만료 시간 확인
  ELSIF NEW.expires_at < now() THEN
    NEW.final_status = 'expired';
    NEW.status = 'expired';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_match_status_trigger
BEFORE UPDATE ON public.match_proposals
FOR EACH ROW
EXECUTE FUNCTION public.update_match_status();

-- 만료된 매칭을 처리하는 함수 (cron job용)
CREATE OR REPLACE FUNCTION public.expire_old_matches()
RETURNS void AS $$
BEGIN
  UPDATE public.match_proposals 
  SET 
    final_status = 'expired',
    status = 'expired',
    updated_at = now()
  WHERE 
    expires_at < now() 
    AND final_status = 'pending'
    AND (proposer_response = 'pending' OR proposed_match_response = 'pending');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- pg_cron과 pg_net 확장 활성화 (이미 활성화되어 있을 수 있음)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 1시간마다 만료된 매칭 처리하는 cron job 설정
SELECT cron.schedule(
  'expire-old-matches',
  '0 * * * *', -- 매시 정각
  'SELECT public.expire_old_matches();'
);