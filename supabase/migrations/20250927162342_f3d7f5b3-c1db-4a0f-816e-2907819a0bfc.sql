-- Add discord_id column to applications table for better visibility
ALTER TABLE applications ADD COLUMN discord_id text;

-- Add discord_id column to purchases table for better visibility  
ALTER TABLE purchases ADD COLUMN discord_id text;

-- Create index for better performance on discord_id lookups
CREATE INDEX idx_applications_discord_id ON applications(discord_id);
CREATE INDEX idx_purchases_discord_id ON purchases(discord_id);