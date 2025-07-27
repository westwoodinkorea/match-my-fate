-- Fix overly permissive RLS policies on match_proposals table
-- Drop the problematic policies first
DROP POLICY IF EXISTS "Allow all authenticated users to create match proposals for adm" ON public.match_proposals;
DROP POLICY IF EXISTS "Allow all authenticated users to update match proposals for adm" ON public.match_proposals;
DROP POLICY IF EXISTS "Allow all authenticated users to view match proposals for admin" ON public.match_proposals;
DROP POLICY IF EXISTS "Users can update their own match proposal status" ON public.match_proposals;
DROP POLICY IF EXISTS "Users can view their own match proposals" ON public.match_proposals;

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