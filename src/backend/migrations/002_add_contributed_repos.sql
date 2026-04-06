-- Add contributed_repos column to builder_profiles
-- These are repos the user contributed to but does NOT own
ALTER TABLE builder_profiles
ADD COLUMN IF NOT EXISTS contributed_repos JSONB DEFAULT '[]';
