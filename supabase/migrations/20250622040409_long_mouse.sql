/*
  # Wedding Invitation Database Schema

  1. New Tables
    - `wedding_invitations`
      - `id` (uuid, primary key)
      - `attendee_name` (text, required)
      - `email` (text, optional)
      - `phone` (text, optional)
      - `confirmed_at` (timestamp)
      - `qr_scanned_at` (timestamp, when QR was first scanned)
      - `scan_count` (integer, how many times QR was scanned)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `wedding_invitations` table
    - Add policy for public read access (for QR scanning)
    - Add policy for public insert (for RSVP)
    - Add policy for public update (for QR scanning tracking)
*/

CREATE TABLE IF NOT EXISTS wedding_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attendee_name text NOT NULL,
  email text,
  phone text,
  confirmed_at timestamptz DEFAULT now(),
  qr_scanned_at timestamptz,
  scan_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE wedding_invitations ENABLE ROW LEVEL SECURITY;

-- Allow public read access for QR scanning
CREATE POLICY "Allow public read access"
  ON wedding_invitations
  FOR SELECT
  TO anon
  USING (true);

-- Allow public insert for RSVP
CREATE POLICY "Allow public insert"
  ON wedding_invitations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public update for QR scanning tracking
CREATE POLICY "Allow public update"
  ON wedding_invitations
  FOR UPDATE
  TO anon
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_wedding_invitations_updated_at
  BEFORE UPDATE ON wedding_invitations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();