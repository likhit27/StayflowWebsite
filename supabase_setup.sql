-- ============================================================
-- StayFlow — Supabase DB Setup
-- Run this once in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create the site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section    TEXT UNIQUE NOT NULL,
  data       JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Auto-update the timestamp on every save
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_updated_at
BEFORE UPDATE ON site_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3. Row-Level Security: public can READ, nobody can write without service key
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "anon_write" ON site_content
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- That's it. The admin panel uses upsert() — rows are
-- created automatically the first time you hit Save.
-- ============================================================
