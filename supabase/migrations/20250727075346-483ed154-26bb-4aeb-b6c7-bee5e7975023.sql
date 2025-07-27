-- Check and fix any missing triggers for the timestamp update function
-- Create trigger for applications table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_applications_updated_at'
    ) THEN
        CREATE TRIGGER update_applications_updated_at
        BEFORE UPDATE ON public.applications
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;

-- Create trigger for profiles table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_profiles_updated_at'
    ) THEN
        CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON public.profiles
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;

-- Create trigger for match_proposals table if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_match_proposals_updated_at'
    ) THEN
        CREATE TRIGGER update_match_proposals_updated_at
        BEFORE UPDATE ON public.match_proposals
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END
$$;

-- Create trigger for match_status update if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'trigger_update_match_status'
    ) THEN
        CREATE TRIGGER trigger_update_match_status
        BEFORE UPDATE ON public.match_proposals
        FOR EACH ROW
        EXECUTE FUNCTION public.update_match_status();
    END IF;
END
$$;

-- Create trigger for new user profile creation if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_new_user();
    END IF;
END
$$;