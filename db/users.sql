
CREATE TABLE users(
  id text PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT NOW()
);

