/*
  # Remove email field from wedding invitations

  1. Changes
    - Remove `email` column from `wedding_invitations` table
    - This is a safe operation that removes optional data

  2. Security
    - No changes to RLS policies needed
    - Existing policies remain intact
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_invitations' AND column_name = 'email'
  ) THEN
    ALTER TABLE wedding_invitations DROP COLUMN email;
  END IF;
END $$;