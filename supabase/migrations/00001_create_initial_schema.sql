-- Create user_role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  email text,
  role public.user_role NOT NULL DEFAULT 'user'::public.user_role,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assignments table
CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  subject text NOT NULL,
  due_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create exams table
CREATE TABLE public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  subject text NOT NULL,
  exam_date timestamptz NOT NULL,
  location text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notes table
CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  subject text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create timetable table
CREATE TABLE public.timetable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_name text NOT NULL,
  course_code text,
  day_of_week int NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  location text,
  instructor text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create goals table
CREATE TABLE public.goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  target_date date,
  progress int DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  level int NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 5),
  progress int DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table (public data, not user-specific)
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  requirements text[],
  salary_range text,
  posted_date timestamptz DEFAULT now(),
  application_url text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_assignments_user_id ON public.assignments(user_id);
CREATE INDEX idx_assignments_due_date ON public.assignments(due_date);
CREATE INDEX idx_exams_user_id ON public.exams(user_id);
CREATE INDEX idx_exams_exam_date ON public.exams(exam_date);
CREATE INDEX idx_notes_user_id ON public.notes(user_id);
CREATE INDEX idx_timetable_user_id ON public.timetable(user_id);
CREATE INDEX idx_goals_user_id ON public.goals(user_id);
CREATE INDEX idx_skills_user_id ON public.skills(user_id);

-- Create trigger function for handle_new_user
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
  username_val text;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  
  -- Extract username from email (format: username@miaoda.com)
  username_val := split_part(NEW.email, '@', 1);
  
  -- Insert a profile synced with fields collected at signup
  INSERT INTO public.profiles (id, username, email, role)
  VALUES (
    NEW.id,
    username_val,
    NEW.email,
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for user confirmation
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Create helper function to check admin
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- RLS Policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- RLS Policies for assignments
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own assignments" ON assignments
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for exams
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own exams" ON exams
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for notes
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notes" ON notes
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for timetable
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own timetable" ON timetable
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for goals
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own goals" ON goals
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for skills
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own skills" ON skills
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- RLS Policies for jobs (public read, admin write)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs" ON jobs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage jobs" ON jobs
  FOR ALL TO authenticated USING (is_admin(auth.uid()));