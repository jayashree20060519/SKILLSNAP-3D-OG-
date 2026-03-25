import { supabase } from './supabase';
import type {
  Profile,
  Assignment,
  Exam,
  Note,
  Timetable,
  Goal,
  Skill,
  Job,
  ChatMessage,
} from '@/types';

// Profile API
export const profileApi = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Assignment API
export const assignmentApi = {
  async getAssignments(userId: string): Promise<Assignment[]> {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', userId)
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createAssignment(assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>): Promise<Assignment> {
    const { data, error } = await supabase
      .from('assignments')
      .insert(assignment)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateAssignment(id: string, updates: Partial<Assignment>): Promise<Assignment> {
    const { data, error } = await supabase
      .from('assignments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteAssignment(id: string): Promise<void> {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Exam API
export const examApi = {
  async getExams(userId: string): Promise<Exam[]> {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('user_id', userId)
      .order('exam_date', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createExam(exam: Omit<Exam, 'id' | 'created_at' | 'updated_at'>): Promise<Exam> {
    const { data, error } = await supabase
      .from('exams')
      .insert(exam)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateExam(id: string, updates: Partial<Exam>): Promise<Exam> {
    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteExam(id: string): Promise<void> {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Note API
export const noteApi = {
  async getNotes(userId: string): Promise<Note[]> {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .insert(note)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateNote(id: string, updates: Partial<Note>): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteNote(id: string): Promise<void> {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Timetable API
export const timetableApi = {
  async getTimetable(userId: string): Promise<Timetable[]> {
    const { data, error } = await supabase
      .from('timetable')
      .select('*')
      .eq('user_id', userId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createTimetableEntry(entry: Omit<Timetable, 'id' | 'created_at' | 'updated_at'>): Promise<Timetable> {
    const { data, error } = await supabase
      .from('timetable')
      .insert(entry)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTimetableEntry(id: string, updates: Partial<Timetable>): Promise<Timetable> {
    const { data, error } = await supabase
      .from('timetable')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTimetableEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('timetable')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Goal API
export const goalApi = {
  async getGoals(userId: string): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .insert(goal)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteGoal(id: string): Promise<void> {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Skill API
export const skillApi = {
  async getSkills(userId: string): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('user_id', userId)
      .order('category', { ascending: true });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<Skill> {
    const { data, error } = await supabase
      .from('skills')
      .insert(skill as any)
      .select()
      .single();
    
    if (error) throw error;
    return data as Skill;
  },

  async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill> {
    const { data, error } = await supabase
      .from('skills')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Skill;
  },

  async deleteSkill(id: string): Promise<void> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Job API
export const jobApi = {
  async getJobs(limit = 20): Promise<Job[]> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  async createJob(job: Omit<Job, 'id' | 'created_at'>): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .insert(job)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteJob(id: string): Promise<void> {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// AI Mentor Chat API
export const aiMentorApi = {
  async sendMessage(messages: ChatMessage[]): Promise<ReadableStream> {
    const { data, error } = await supabase.functions.invoke('ai-mentor-chat', {
      body: { messages },
    });

    if (error) {
      const errorMsg = await error?.context?.text?.();
      console.error('Edge function error in ai-mentor-chat:', errorMsg || error?.message);
      throw new Error(errorMsg || error?.message || 'Failed to send message');
    }

    return data;
  },
};
