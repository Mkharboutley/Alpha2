/*
  # Remove phone field from wedding invitations

  1. Changes
    - Remove `phone` column from `wedding_invitations` table
  
  2. Safety
    - Uses conditional logic to prevent errors if column doesn't exist
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_invitations' AND column_name = 'phone'
  ) THEN
    ALTER TABLE wedding_invitations DROP COLUMN phone;
  END IF;
END $$;