import { getClient } from '../serverdb';
import { User } from './signup';
import bcrypt from 'bcrypt';
import { hashPassword } from './signup';
import { get } from 'http';

export async function login(email, pass) {
  const client = await getClient();
  // look up email in user db, get user record from query
  const res = client.query<User>(
    `SELECT * FROM users WHERE email = $1 RETURNING email`,
    [email]
  );
  // return err if not found or null

  // use bcrypt.compare() to check pw give against digest in db
  // return err if no match
  // proceed if matches
  // insert a new session record to session table. Create new token, hash that token.
  // library called uuid - use to generate a session token.
  // hash token before issuing. Enter into sessions table for hashed_access_token
  // create a new Date() in js for a timeout on session. Reference date 2 weeks from Now as expires_at timestamp, insert into sessions table.
  // return unhashed access token to user.
  // token will be hased and compared to sessions table upon each user request
  // use middleware for ease of use?
}
