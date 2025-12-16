/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required) - Contact's name
      - `email` (text, required) - Contact email
      - `subject` (text, required) - Inquiry subject/category
      - `message` (text, required) - Contact message
      - `status` (text, default 'new') - Status (new, read, responded, archived)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public inserts (anyone can contact)
    - Add policy for authenticated admin reads
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created 
  ON contact_submissions(created_at DESC);
