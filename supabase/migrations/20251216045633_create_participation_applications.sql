/*
  # Create Participation Applications Table

  1. New Tables
    - `participation_applications`
      - `id` (uuid, primary key)
      - `name` (text, required) - Applicant's full name
      - `email` (text, required) - Contact email
      - `phone` (text, optional) - Contact phone number
      - `referral_source` (text, required) - How they heard about the study
      - `wearable_device` (text, required) - Type of wearable device owned
      - `preferred_location` (text, required) - Preferred study location
      - `availability` (jsonb, required) - Time slot preferences as array
      - `has_experience` (text, optional) - Previous breathwork/sound therapy experience
      - `additional_info` (text, optional) - Additional comments
      - `status` (text, default 'pending') - Application status (pending, reviewed, approved, declined)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `participation_applications` table
    - Add policy for public inserts (anyone can apply)
    - Add policy for authenticated admin reads
*/

CREATE TABLE IF NOT EXISTS participation_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  referral_source text NOT NULL,
  wearable_device text NOT NULL,
  preferred_location text NOT NULL,
  availability jsonb NOT NULL DEFAULT '[]'::jsonb,
  has_experience text,
  additional_info text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE participation_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit participation application"
  ON participation_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON participation_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON participation_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_participation_applications_email 
  ON participation_applications(email);

CREATE INDEX IF NOT EXISTS idx_participation_applications_status 
  ON participation_applications(status);

CREATE INDEX IF NOT EXISTS idx_participation_applications_created 
  ON participation_applications(created_at DESC);
