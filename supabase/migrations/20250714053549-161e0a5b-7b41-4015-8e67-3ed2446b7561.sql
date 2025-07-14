-- 관리자가 모든 신청서를 볼 수 있도록 RLS 정책 추가
-- 특정 이메일 주소를 가진 사용자를 관리자로 인정
CREATE POLICY "Admin can view all applications"
ON public.applications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('ilovematchingforlove@gmail.com', 'koreawestwood@gmail.com', 'saraloveswhisky@gmail.com')
  )
);

-- 관리자가 모든 매치 제안을 관리할 수 있도록 정책 추가 (이미 있지만 명시적으로 확인)
CREATE POLICY "Admin can manage all match proposals" 
ON public.match_proposals 
FOR ALL
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.email IN ('ilovematchingforlove@gmail.com', 'koreawestwood@gmail.com', 'saraloveswhisky@gmail.com')
  )
);