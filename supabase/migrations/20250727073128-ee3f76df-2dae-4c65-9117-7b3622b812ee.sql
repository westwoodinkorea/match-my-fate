-- Fix overly permissive RLS policies on match_proposals table
-- Drop ALL existing policies to start fresh
DROP POLICY "Allow all authenticated users to create match proposals for adm" ON public.match_proposals;
DROP POLICY "Allow all authenticated users to update match proposals for adm" ON public.match_proposals;
DROP POLICY "Allow all authenticated users to view match proposals for admin" ON public.match_proposals;
DROP POLICY "Users can update their own match proposal status" ON public.match_proposals;
DROP POLICY "Users can view their own match proposals" ON public.match_proposals;

-- Create more restrictive policies that properly protect user data
CREATE POLICY "Users can view proposals where they are proposer" 
ON public.match_proposals 
FOR SELECT 
USING (auth.uid() = proposer_id);

CREATE POLICY "Users can view proposals where they are proposed match" 
ON public.match_proposals 
FOR SELECT 
USING (auth.uid() = proposed_match_id);

CREATE POLICY "Users can update proposals where they are proposer" 
ON public.match_proposals 
FOR UPDATE 
USING (auth.uid() = proposer_id);

CREATE POLICY "Users can update proposals where they are proposed match" 
ON public.match_proposals 
FOR UPDATE 
USING (auth.uid() = proposed_match_id);