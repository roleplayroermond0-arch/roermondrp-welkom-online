-- Fix RLS policies with security definer functions to avoid infinite recursion

-- Create security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Drop existing policies that reference the same table
DROP POLICY IF EXISTS "Only admins can modify jobs" ON public.jobs;
DROP POLICY IF EXISTS "Only admins can modify application questions" ON public.application_questions;
DROP POLICY IF EXISTS "Admins can view other admins" ON public.admin_users;
DROP POLICY IF EXISTS "Only admins can view logs" ON public.admin_logs;
DROP POLICY IF EXISTS "Only admins can create logs" ON public.admin_logs;

-- Recreate policies using the security definer function
CREATE POLICY "Only admins can modify jobs" ON public.jobs
FOR ALL TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Only admins can modify application questions" ON public.application_questions
FOR ALL TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Admins can view other admins" ON public.admin_users
FOR SELECT TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Only admins can view logs" ON public.admin_logs
FOR SELECT TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Only admins can create logs" ON public.admin_logs
FOR INSERT TO authenticated
WITH CHECK (public.is_current_user_admin());

-- Enable RLS on existing tables that don't have it
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Banen" ENABLE ROW LEVEL SECURITY;

-- Create basic policies for existing tables
CREATE POLICY "Anyone can view profiles" ON public.profiles
FOR SELECT USING (true);

CREATE POLICY "Anyone can view Banen" ON public."Banen"
FOR SELECT USING (true);

-- Fix search_path for update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;