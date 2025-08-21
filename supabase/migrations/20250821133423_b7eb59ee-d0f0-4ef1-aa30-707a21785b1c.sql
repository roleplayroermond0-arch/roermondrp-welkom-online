-- Create user_permissions table to track Discord roles
CREATE TABLE public.user_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discord_id TEXT,
  has_webadmin_role BOOLEAN DEFAULT FALSE,
  is_discord_member BOOLEAN DEFAULT FALSE,
  discord_roles TEXT[],
  last_role_check TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Users can view their own permissions
CREATE POLICY "Users can view their own permissions" 
ON public.user_permissions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can update their own permissions (for role checking)
CREATE POLICY "Users can update their own permissions" 
ON public.user_permissions 
FOR ALL
USING (auth.uid() = user_id);

-- Admins can view all permissions
CREATE POLICY "Admins can view all permissions" 
ON public.user_permissions 
FOR SELECT 
USING (is_current_user_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_permissions_updated_at
BEFORE UPDATE ON public.user_permissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add admin user for secret login
INSERT INTO public.admin_users (username, password_hash, is_active) 
VALUES ('ADM_RMRP', '$2b$10$XQW.MJ6xbK8rKTqQRQ6ogu6H3jF5eT8zZ7bR9VqLkN0nQ1W5V3X6W', true)
ON CONFLICT (username) DO NOTHING;