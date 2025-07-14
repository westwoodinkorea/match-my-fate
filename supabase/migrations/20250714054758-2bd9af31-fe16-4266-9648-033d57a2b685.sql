-- 먼저 기존 정책들을 삭제
DROP POLICY IF EXISTS "Admin can view all applications" ON public.applications;
DROP POLICY IF EXISTS "Admin can manage all match proposals" ON public.match_proposals;

-- 현재 사용자가 관리자인지 확인하는 보안 정의자 함수 생성
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- 특정 사용자 ID들을 관리자로 지정 (실제 사용자 ID로 교체 필요)
  RETURN auth.uid() IN (
    '8cdec1fc-842f-442d-be9d-e55724ef40a3'::uuid,  -- ilovematchingforlove@gmail.com
    '9ef83448-708b-48c3-a704-686cce49a23d'::uuid,  -- koreawestwood@gmail.com  
    '28159eb0-d1f9-4445-a2d5-a35de69436e0'::uuid   -- saraloveswhisky@gmail.com
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 관리자가 모든 신청서를 볼 수 있도록 하는 정책
CREATE POLICY "Admin can view all applications"
ON public.applications
FOR SELECT
TO authenticated
USING (public.is_admin());

-- 관리자가 모든 매치 제안을 관리할 수 있도록 하는 정책
CREATE POLICY "Admin can manage all match proposals" 
ON public.match_proposals 
FOR ALL
TO authenticated 
USING (public.is_admin());