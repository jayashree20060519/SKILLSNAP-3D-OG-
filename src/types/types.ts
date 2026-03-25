export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  role: UserRole;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  subject: string;
  due_date: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface Exam {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  exam_date: string;
  location: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  subject: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Timetable {
  id: string;
  user_id: string;
  course_name: string;
  course_code: string | null;
  day_of_week: number;
  start_time: string;
  end_time: string;
  location: string | null;
  instructor: string | null;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  target_date: string | null;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  category: string;
  level: number;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[] | null;
  salary_range: string | null;
  posted_date: string;
  application_url: string | null;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}
