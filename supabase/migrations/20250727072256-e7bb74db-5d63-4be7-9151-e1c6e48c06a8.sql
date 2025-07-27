-- Fix Function Search Path Mutable issues by setting search_path for all functions

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email,
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$function$;

-- Fix is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- 특정 사용자 ID들을 관리자로 지정 (실제 사용자 ID로 교체 필요)
  RETURN auth.uid() IN (
    '8cdec1fc-842f-442d-be9d-e55724ef40a3'::uuid,  -- ilovematchingforlove@gmail.com
    '9ef83448-708b-48c3-a704-686cce49a23d'::uuid,  -- koreawestwood@gmail.com  
    '28159eb0-d1f9-4445-a2d5-a35de69436e0'::uuid   -- saraloveswhisky@gmail.com
  );
END;
$function$;

-- Fix update_match_status function
CREATE OR REPLACE FUNCTION public.update_match_status()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
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
$function$;

-- Fix expire_old_matches function
CREATE OR REPLACE FUNCTION public.expire_old_matches()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

-- Fix overly permissive RLS policies on match_proposals table
-- Drop the problematic policies first
DROP POLICY IF EXISTS "Allow all authenticated users to create match proposals for adm" ON public.match_proposals;
DROP POLICY IF EXISTS "Allow all authenticated users to update match proposals for adm" ON public.match_proposals;
DROP POLICY IF EXISTS "Allow all authenticated users to view match proposals for admin" ON public.match_proposals;

-- Create more restrictive policies
CREATE POLICY "Users can view their own match proposals (as proposer)" 
ON public.match_proposals 
FOR SELECT 
USING (auth.uid() = proposer_id);

CREATE POLICY "Users can view their own match proposals (as proposed match)" 
ON public.match_proposals 
FOR SELECT 
USING (auth.uid() = proposed_match_id);

CREATE POLICY "Users can update their responses on proposals where they are proposer" 
ON public.match_proposals 
FOR UPDATE 
USING (auth.uid() = proposer_id);

CREATE POLICY "Users can update their responses on proposals where they are proposed match" 
ON public.match_proposals 
FOR UPDATE 
USING (auth.uid() = proposed_match_id);