CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  ip_hash TEXT,
  user_agent TEXT,
  referrer TEXT,
  path TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  event_type TEXT NOT NULL,
  event_label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying by event type
CREATE INDEX idx_visits_event_type ON visits(event_type);

-- Index for UTM analysis
CREATE INDEX idx_visits_utm_source ON visits(utm_source);
