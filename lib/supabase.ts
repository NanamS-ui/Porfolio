import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  title_en?: string | null;
  description: string;
  description_en?: string | null;
  short_description: string;
  short_description_en?: string | null;
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
  name_en?: string | null;
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
  position_en?: string | null;
  description: string;
  description_en?: string | null;
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
  diploma_en?: string | null;
  period: string;
  location: string | null;
  description: string | null;
  description_en?: string | null;
  debouches: string[]; // tableau de débouchés
  debouches_en?: string[] | null;
  order_index: number;
  created_at: string;
  updated_at: string;
};