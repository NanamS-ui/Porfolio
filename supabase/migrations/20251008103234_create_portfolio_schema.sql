/*
  # Portfolio Database Schema

  ## Overview
  This migration creates the complete database structure for a professional portfolio website.

  ## New Tables
  
  ### `projects`
  - `id` (uuid, primary key): Unique identifier for each project
  - `title` (text): Project name
  - `description` (text): Detailed project description
  - `short_description` (text): Brief project summary
  - `image_url` (text): Main project image
  - `demo_url` (text, nullable): Live demo link
  - `github_url` (text, nullable): GitHub repository link
  - `technologies` (text[]): Array of technologies used
  - `category` (text): Project category (web, mobile, design, etc.)
  - `featured` (boolean): Whether to feature on homepage
  - `order_index` (integer): Display order
  - `created_at` (timestamptz): Creation timestamp
  - `updated_at` (timestamptz): Last update timestamp

  ### `skills`
  - `id` (uuid, primary key): Unique identifier
  - `name` (text): Skill name
  - `category` (text): Skill category (frontend, backend, tools, etc.)
  - `proficiency` (integer): Skill level (1-100)
  - `icon` (text, nullable): Icon name or URL
  - `order_index` (integer): Display order
  - `created_at` (timestamptz): Creation timestamp

  ### `experience`
  - `id` (uuid, primary key): Unique identifier
  - `company` (text): Company name
  - `position` (text): Job title
  - `description` (text): Role description
  - `location` (text, nullable): Work location
  - `start_date` (date): Start date
  - `end_date` (date, nullable): End date (null if current)
  - `technologies` (text[]): Technologies used
  - `is_current` (boolean): Currently working here
  - `order_index` (integer): Display order
  - `created_at` (timestamptz): Creation timestamp

  ### `contact_messages`
  - `id` (uuid, primary key): Unique identifier
  - `name` (text): Sender name
  - `email` (text): Sender email
  - `subject` (text): Message subject
  - `message` (text): Message content
  - `read` (boolean): Message read status
  - `created_at` (timestamptz): Creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Public read access for projects, skills, and experience (portfolio content)
  - Contact messages are write-only for anonymous users
  - Full admin access requires authentication (for future admin panel)

  ## Notes
  - All tables use UUID primary keys for security
  - Timestamps are automatic with defaults
  - Arrays are used for flexible multi-value fields
  - Boolean flags enable easy filtering and feature toggling
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  image_url text NOT NULL,
  demo_url text,
  github_url text,
  technologies text[] NOT NULL DEFAULT '{}',
  category text NOT NULL,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  location text,
  start_date date NOT NULL,
  end_date date,
  technologies text[] NOT NULL DEFAULT '{}',
  is_current boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access for portfolio content
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view experience"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can submit contact messages
CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can manage all content (for future admin panel)
CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage skills"
  ON skills FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage experience"
  ON experience FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS projects_order_idx ON projects(order_index);
CREATE INDEX IF NOT EXISTS skills_category_idx ON skills(category);
CREATE INDEX IF NOT EXISTS experience_is_current_idx ON experience(is_current);
CREATE INDEX IF NOT EXISTS contact_messages_read_idx ON contact_messages(read);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at DESC);