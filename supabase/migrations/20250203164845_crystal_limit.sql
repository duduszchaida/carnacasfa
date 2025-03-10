/*
  # Create RSVP table for party confirmations

  1. New Tables
    - `rsvp_responses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `contribution_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `rsvp_responses` table
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  contribution_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert RSVP responses"
  ON rsvp_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to read RSVP responses"
  ON rsvp_responses
  FOR SELECT
  TO public
  USING (true);