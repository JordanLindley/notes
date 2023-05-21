import { getClient } from '../serverdb';
import bcrypt from 'bcrypt';

// look up email in user db, get user record from query
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
