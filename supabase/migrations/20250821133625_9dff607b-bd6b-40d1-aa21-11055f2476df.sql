-- Enable RLS on tables that don't have it
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Banen" ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for admins table
CREATE POLICY "Only admins can access admins table" 
ON public.admins 
FOR ALL
USING (is_current_user_admin());

-- Add RLS policies for Banen table (make it publicly readable)
CREATE POLICY "Anyone can view Banen" 
ON public."Banen" 
FOR SELECT 
USING (true);