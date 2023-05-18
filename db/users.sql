-- When we're ready to work on users we can move this into a migration file.
CREATE TABLE users(
  id text PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT NOW()
);

