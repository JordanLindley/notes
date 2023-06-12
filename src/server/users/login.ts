import { getClient } from '../serverdb';
import { User } from './signup';
import bcrypt from 'bcrypt';
import { hashPassword } from './signup';
import { v4 as uuidv4 } from 'uuid';

export type Session = {
  token: string;
  expires_at: object;
};

export async function login(email: string, pass: string) {
  const client = await getClient();
  const digest = await hashPassword(pass);

  // look up email in user db, get user record from query
  // return digest from query as well as email and userID.
  const res = await client.query<User>(
    `SELECT * FROM users WHERE email = $1 RETURNING email, id, digest`,
    [email]
  );

  // return err if not found or null
  if (res.rows[0] == null) {
    return 'email not found!';
  }

  // use bcrypt.compare() to check pw given against digest in db
  if (await bcrypt.compare(pass, digest)) {
    //returns true or false
    console.log('success!');
    // proceed if matches
    async function createSession() {
      // create new token then hash token.
      const token = uuidv4();
      const hashedToken = hashPassword(token);
      // create a new Date() in js for a timeout on session. Reference date 2 weeks from Now
      const timeout = new Date(Date.now() + 12096e5);

      // Enter into sessions table for hashed_access_token
      const newSession = await client.query<Session>(
        `INSERT INTO sessions (hashed_access_token, expires_at) VALUES ($1, $2) RETURNING user_id, expires_at`,
        [hashedToken, timeout] // trouble grabbing user ID here...
      );
      // return unhashed access token to user.

      // token will be hashed and compared to sessions table upon each user request
    }
  } else {
    return 'password incorrect';
  }
  // use middleware for ease of use?
}
