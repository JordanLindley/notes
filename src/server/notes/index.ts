import { getClient } from '../serverdb';

export type Note = {
  id: string;
  created_at: Date;
  title: string;
  body: string;
};

export async function getAllNotes(): Promise<Note[]> {
  const client = await getClient();

  const res = await client.query<Note>(
    `SELECT * FROM notes ORDER BY created_at DESC;`
  );
  await client.end();

  return res.rows;
}

export async function createNote(title?: string, body?: string): Promise<Note> {
  const client = await getClient();

  const res = await client.query<Note>(
    `INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING id, title, body;`,
    [title, body]
  );
  await client.end();

  return res.rows[0];
}

export async function deleteNote(id: string): Promise<void> {
  const client = await getClient();

  await client.query<Note>(`DELETE FROM notes WHERE id = $1;`, [id]);
  await client.end();
}

export async function updateNote(
  noteID: string,
  title?: string,
  body?: string
): Promise<Note> {
  const client = await getClient();

  const res = await client.query<Note>(
    `UPDATE notes SET title = $1, BODY = $2 WHERE id = $3 RETURNING id, title, body;`,
    [title, body, noteID]
  );
  await client.end();

  return res.rows[0];
}

export async function readNote(id: string): Promise<Note> {
  const client = await getClient();

  const res = await client.query<Note>(`SELECT * FROM notes WHERE id = $1;`, [
    id,
  ]);
  await client.end();

  return res.rows[0];
}
