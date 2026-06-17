CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  url_hash TEXT NOT NULL,
  domain TEXT NOT NULL,
  overall_score INTEGER,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

CREATE INDEX idx_audits_url_hash ON audits(url_hash);
CREATE INDEX idx_audits_created_at ON audits(created_at);

CREATE TABLE rate_limits (
  ip TEXT PRIMARY KEY,
  request_count INTEGER DEFAULT 0,
  window_start TIMESTAMPTZ DEFAULT NOW()
);

-- Note: RLS should be enabled on the tables. 
-- Since we use the Service Role Key in API routes, we don't need to define specific policies for public access right now, 
-- but enabling it ensures safety.
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
