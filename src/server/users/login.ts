import { getClient } from '../serverdb';
import { User } from './signup';
import bcrypt from 'bcrypt';
import { hashPassword } from './signup';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'pg';

export type Session = {
  token: string;
  expires_at: object;
};

export async function login(email: string, pass: string) {
  console.log(email, pass);
  const client = await getClient();

  // look up email in user db, get user record from query
  // return digest from query as well as email and userID.
  const { rows } = await client.query<User & { digest: string }>(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  const [user] = rows;

  // return err if not found or null
  if (!user) {
    throw new Error('email not found!');
  }
  // use bcrypt.compare() to check pw given against digest in db
  if (await bcrypt.compare(pass, user.digest)) {
    return createSession(client, user);
  } else {
    throw new Error('password incorrect!');
  }
}

export async function createSession(client: Client, user: User) {
  const token = uuidv4();
  const hashedToken = hashPassword(token);
  // create a new Date() in js for a timeout on session. Reference date 2 weeks from Now
  const timeout = new Date(Date.now() + 12096e5);

  // Enter into sessions table for hashed_access_token
  await client.query<Session>(
    `INSERT INTO sessions (hashed_access_token, expires_at, user_id) VALUES ($1, $2, $3) RETURNING user_id, expires_at;`,
    [hashedToken, timeout, user.id]
  );
  // return unhashed access token to user.
  // token will be hashed and compared to sessions table upon each user request
  return { token };
}
