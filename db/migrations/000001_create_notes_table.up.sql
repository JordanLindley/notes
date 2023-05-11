CREATE TABLE notes(
  id text PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp without time zone NOT NULL DEFAULT NOW(),
  title text,
  body text
);

