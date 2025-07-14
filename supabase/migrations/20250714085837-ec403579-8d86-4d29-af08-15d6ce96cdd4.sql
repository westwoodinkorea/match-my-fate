-- 매칭 결제 정보를 저장하는 테이블
CREATE TABLE public.match_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_proposal_id UUID NOT NULL REFERENCES public.match_proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  amount INTEGER NOT NULL, -- 결제 금액 (원 단위)
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed, refunded
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 연락처 교환 정보를 저장하는 테이블
CREATE TABLE public.contact_exchanges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_proposal_id UUID NOT NULL REFERENCES public.match_proposals(id) ON DELETE CASCADE,
  proposer_contact TEXT, -- 제안자 연락처
  proposed_match_contact TEXT, -- 매칭 상대방 연락처
  exchange_status TEXT NOT NULL DEFAULT 'pending', -- pending, completed
  exchanged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 거절 이유를 저장하는 테이블
CREATE TABLE public.match_rejections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_proposal_id UUID NOT NULL REFERENCES public.match_proposals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rejection_reason TEXT, -- 거절 이유
  rejection_category TEXT, -- 거절 카테고리 (나이, 직업, 성격 등)
  additional_comments TEXT, -- 추가 코멘트
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- match_proposals 테이블에 새로운 상태값들 추가
-- accepted, rejected, payment_pending, payment_completed, contact_exchanged, completed, cancelled

-- RLS 정책 설정
ALTER TABLE public.match_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_exchanges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_rejections ENABLE ROW LEVEL SECURITY;

-- match_payments 정책
CREATE POLICY "Users can view their own payments" ON public.match_payments
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" ON public.match_payments
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all payments" ON public.match_payments
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admin can manage all payments" ON public.match_payments
FOR ALL USING (public.is_admin());

-- contact_exchanges 정책
CREATE POLICY "Users can view their own contact exchanges" ON public.contact_exchanges
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.match_proposals mp 
    WHERE mp.id = match_proposal_id 
    AND (mp.proposer_id = auth.uid() OR mp.proposed_match_id = auth.uid())
  )
);

CREATE POLICY "Users can update their own contact exchanges" ON public.contact_exchanges
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.match_proposals mp 
    WHERE mp.id = match_proposal_id 
    AND (mp.proposer_id = auth.uid() OR mp.proposed_match_id = auth.uid())
  )
);

CREATE POLICY "Admin can manage all contact exchanges" ON public.contact_exchanges
FOR ALL USING (public.is_admin());

-- match_rejections 정책
CREATE POLICY "Users can view their own rejections" ON public.match_rejections
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own rejections" ON public.match_rejections
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can view all rejections" ON public.match_rejections
FOR SELECT USING (public.is_admin());

-- 업데이트 트리거 추가
CREATE TRIGGER update_match_payments_updated_at
BEFORE UPDATE ON public.match_payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_exchanges_updated_at
BEFORE UPDATE ON public.contact_exchanges
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();