import { Client } from 'pg';

export type Note = {
  id: string;
  created_at: Date;
  owner: string;
  title: string;
  body: string;
};

async function getClient() {
  const client = new Client({
    user: 'jordanlindley',
    host: 'localhost',
    database: 'notes',
    port: 5432,
  })

  await client.connect();
  
  return client;
}

export async function getAllNotes(): Promise<Note[]> {
  const client = await getClient();
 
  const res = await client.query<Note>(`SELECT * FROM notes`);
  await client.end();

  return res.rows;
}

export async function createNote(owner:string, title?:string, body?:string): Promise<Note> {
  const client = await getClient();
 
  const res = await client.query<Note>(`INSERT INTO notes (owner, title, body) VALUES ($1, $2, $3);`, [owner, title, body]);
  await client.end();

  return res.rows[0];
}

export async function deleteNote(id:string): Promise<void> {
  const client = await getClient();

  const res = await client.query<Note>(`DELETE FROM notes WHERE id = $1;`, [id]);
  await client.end();

  console.log('Gone!');
}

export async function updateNote(noteID:string, title?:string, body?:string): Promise<Note> {
  const client = await getClient();

  const res = await client.query<Note>(`UPDATE notes SET title = $1, BODY = $2 WHERE id = $3;`, [title, body, noteID]);
  await client.end();

  return res.rows[0];
}

export async function readNote(id:string): Promise<Note> {
  const client = await getClient();

  const res = await client.query<Note>(`SELECT * FROM notes WHERE id = $1;`, [id]);
  await client.end();

  return res.rows[0];
}