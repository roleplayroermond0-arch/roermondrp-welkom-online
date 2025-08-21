-- Enable RLS on admins table and add policy
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for admins table
CREATE POLICY "Only admins can access admins table" 
ON public.admins 
FOR ALL
USING (is_current_user_admin());