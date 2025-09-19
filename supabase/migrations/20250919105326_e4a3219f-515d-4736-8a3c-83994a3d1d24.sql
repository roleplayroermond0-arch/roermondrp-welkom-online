-- Enable RLS on all tables that need it to fix security warnings

-- Enable RLS on Banen table (if not already enabled)
ALTER TABLE public."Banen" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on profiles table (should already be enabled, but ensuring it)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Verify all other critical tables have RLS enabled
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_answers ENABLE ROW LEVEL SECURITY;