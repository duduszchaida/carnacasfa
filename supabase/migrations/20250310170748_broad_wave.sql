/*
  # Update RSVP responses table

  1. Changes
    - Remove phone column
    - Add costume_participation column
    - Add food_type column

  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  -- Add new columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rsvp_responses' AND column_name = 'costume_participation'
  ) THEN
    ALTER TABLE rsvp_responses ADD COLUMN costume_participation text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rsvp_responses' AND column_name = 'food_type'
  ) THEN
    ALTER TABLE rsvp_responses ADD COLUMN food_type text;
  END IF;

  -- Remove phone column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rsvp_responses' AND column_name = 'phone'
  ) THEN
    ALTER TABLE rsvp_responses DROP COLUMN phone;
  END IF;
END $$;