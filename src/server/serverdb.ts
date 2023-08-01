import { Client } from 'pg';

export async function getClient() {
  const client = new Client({ connectionString: process.env.NOTES_DB_URL });

  await client.connect();

  return client;
}
