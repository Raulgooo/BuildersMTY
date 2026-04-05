-- BuildersMTY: builder_profiles table
-- Run this in the Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS builder_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  discord_id TEXT UNIQUE NOT NULL,
  github_username TEXT UNIQUE NOT NULL,
  github_id BIGINT,
  avatar_url TEXT,
  discord_avatar_url TEXT,
  discord_display_name TEXT,
  email TEXT,
  bio TEXT,
  public_repos_count INT DEFAULT 0,
  private_repos_count INT DEFAULT 0,
  total_stars INT DEFAULT 0,
  total_forks INT DEFAULT 0,
  total_commits INT DEFAULT 0,
  total_prs INT DEFAULT 0,
  top_languages JSONB DEFAULT '{}',
  language_tags TEXT[] DEFAULT '{}',
  repositories JSONB DEFAULT '[]',
  -- Scoring
  score FLOAT DEFAULT 0.0,
  rank TEXT,
  score_breakdown JSONB DEFAULT '{}',
  -- LLM Analysis
  llm_summary TEXT,
  llm_strengths JSONB DEFAULT '[]',
  llm_recommendations JSONB DEFAULT '[]',
  developer_archetype TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_builder_profiles_language_tags ON builder_profiles USING GIN (language_tags);
CREATE INDEX IF NOT EXISTS idx_builder_profiles_rank ON builder_profiles (rank);
CREATE INDEX IF NOT EXISTS idx_builder_profiles_score ON builder_profiles (score DESC);
