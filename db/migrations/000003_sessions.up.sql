BEGIN;
CREATE TABLE sessions (
  id text PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text REFERENCES users(id) ON DELETE CASCADE,
  hashed_access_token text NOT NULL,
  expires_at timestamp without time zone NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT NOW()
);
CREATE INDEX sessions_hashed_access_token_index on sessions(hashed_access_token);
COMMIT;