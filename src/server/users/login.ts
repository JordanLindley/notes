import { getClient } from '../serverdb';
import { User } from './signup';
import bcrypt from 'bcrypt';
import { hashPassword } from './signup';
import { v4 as uuidv4 } from 'uuid';

export async function login(email, pass) {
  const client = await getClient();
  const hashedPass = await hashPassword(pass);
  // look up email in user db, get user record from query
  const res = await client.query<User>(
    `SELECT * FROM users WHERE email = $1 RETURNING email`,
    [email]
  );
  // return err if not found or null
  if (res.rows[0] == null) {
    return 'email not found!';
  }
  // use bcrypt.compare() to check pw give against digest in db
  bcrypt.compare(pass, hashedPass, function (err, hash) {
    if (err) {
      return `incorrect password!`;
    }
    if (hash) {
      // return json stuff??
      // proceed if matches
    } else {
      // return hash.json({success: false, message: `incorrect password!`}); <- returning an error on .json...
    }

    // insert a new session record to session table. Create new token, hash that token.
    // uuidv4() -- creates random uuid.
    // hash token before issuing. Enter into sessions table for hashed_access_token
    // const hashedToken = hadPassword(token);
    // create a new Date() in js for a timeout on session. Reference date 2 weeks from Now as expires_at timestamp, insert into sessions table.
    // return unhashed access token to user.
    // token will be hashed and compared to sessions table upon each user request
    // use middleware for ease of use?
  });
}
