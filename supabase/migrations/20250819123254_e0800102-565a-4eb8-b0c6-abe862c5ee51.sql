-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  totp_secret TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_accepting_applications BOOLEAN DEFAULT true,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create application_questions table
CREATE TABLE public.application_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'text', -- text, textarea, select, radio, checkbox
  options TEXT[], -- for select/radio/checkbox questions
  is_required BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin_logs table for activity tracking
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.admin_users(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for jobs (public read, admin write)
CREATE POLICY "Anyone can view jobs" ON public.jobs
FOR SELECT USING (true);

CREATE POLICY "Only admins can modify jobs" ON public.jobs
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE id = auth.uid() AND is_active = true
));

-- RLS policies for application_questions (public read, admin write)
CREATE POLICY "Anyone can view application questions" ON public.application_questions
FOR SELECT USING (true);

CREATE POLICY "Only admins can modify application questions" ON public.application_questions
FOR ALL TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE id = auth.uid() AND is_active = true
));

-- RLS policies for admin_users (restricted access)
CREATE POLICY "Admins can view other admins" ON public.admin_users
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE id = auth.uid() AND is_active = true
));

-- RLS policies for admin_logs (admin only)
CREATE POLICY "Only admins can view logs" ON public.admin_logs
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE id = auth.uid() AND is_active = true
));

CREATE POLICY "Only admins can create logs" ON public.admin_logs
FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE id = auth.uid() AND is_active = true
));

-- Insert default jobs
INSERT INTO public.jobs (name, description, icon) VALUES
('Politie', 'Handhaving van de openbare orde en veiligheid', '🚔'),
('Ambulance', 'Medische hulpverlening en spoedzorg', '🚑'),
('KMar', 'Koninklijke Marechaussee - grens- en luchthavenpolitie', '🛂'),
('ANWB', 'Wegenwacht en pechhulp', '🚗'),
('Taxi', 'Personenvervoer en taxidiensten', '🚕'),
('Brandweer', 'Brandbestrijding en hulpverlening', '🚒');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_application_questions_updated_at
  BEFORE UPDATE ON public.application_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();