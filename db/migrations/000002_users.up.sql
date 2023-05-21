BEGIN;
CREATE TABLE users(
  id text PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  digest text UNIQUE NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT NOW()
);
CREATE INDEX users_email_index ON users(email);
COMMIT;
