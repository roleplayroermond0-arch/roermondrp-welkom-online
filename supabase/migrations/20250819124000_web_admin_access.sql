-- Create table to track whether a user is a Discord member and has WebAdmin role
CREATE TABLE IF NOT EXISTS public.web_admin_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  discord_id TEXT,
  is_member BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  roles TEXT[] DEFAULT '{}',
  last_checked TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.web_admin_access ENABLE ROW LEVEL SECURITY;

-- Allow the authenticated user to see only their own record
CREATE POLICY IF NOT EXISTS "Users can view their own web_admin_access" ON public.web_admin_access
FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Helper to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_web_admin_access_updated_at ON public.web_admin_access;
CREATE TRIGGER update_web_admin_access_updated_at
  BEFORE UPDATE ON public.web_admin_access
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

