import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  short_description: string;
  image_url: string;
  demo_url: string | null;
  github_url: string | null;
  technologies: string[];
  category: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  order_index: number;
  created_at: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  description: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  technologies: string[];
  is_current: boolean;
  order_index: number;
  created_at: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type Formation = {
  id: string;
  institution: string;
  logo_url: string | null;
  diploma: string;
  period: string;
  location: string | null;
  description: string | null;
  debouches: string[]; // tableau de débouchés
  order_index: number;
  created_at: string;
  updated_at: string;
};