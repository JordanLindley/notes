import { getClient } from '../serverdb';
import bcrypt from 'bcrypt';
import { createSession } from './login';

export type User = {
  id: string;
  email: string;
};

export async function hashPassword(pw: string): Promise<string> {
  return new Promise((resolve, reject) =>
    bcrypt.hash(pw, 10, (err, hash) => (err ? reject(err) : resolve(hash)))
  );
}

export async function signup(email: string, userPass: string) {
  const client = await getClient();
  const digest = await hashPassword(userPass);

  const res = await client.query<User>(
    `INSERT INTO users (email, digest) VALUES ($1, $2) RETURNING id, email;`,
    [email, digest]
  );

  const user = res.rows[0];

  const { accessToken } = await createSession(client, user);

  await client.end();

  return { ...user, accessToken };
}
