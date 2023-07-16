import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  readNote,
} from './notes';
import bodyParser from 'body-parser';
import { signup } from './users/signup';
import { login } from './users/login';

const notesRouter = express.Router();
const usersRouter = express.Router();

notesRouter.get('/', async (_req, res) => {
  res.send(await getAllNotes());
});

notesRouter.get('/:id', async (req, res) => {
  const id = await req.params.id;

  res.send(await readNote(id));
});

notesRouter.post('/', async (req, res) => {
  const { title, body } = await req.body;
  res.send(await createNote(title, body));
});

notesRouter.delete('/:id', async (req, res) => {
  const id = await req.params.id;

  res.send(await deleteNote(id));
});

notesRouter.patch('/:id', async (req, res) => {
  const { title, body } = await req.body;
  const id = await req.params.id;

  res.send(await updateNote(id, title, body));
});

usersRouter.post('/signup', async (req, res) => {
  const { email, pass } = await req.body;
  res.send(await signup(email, pass));
});

usersRouter.post('/login', async (req, res) => {
  const { email, pass } = await req.body;
  res.send(await login(email, pass));
});

const apiRouter = express.Router();

apiRouter.use('/notes', notesRouter);
apiRouter.use('/users', usersRouter);

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRouter);

// Serve app production bundle
app.use(express.static('dist/client'));

// Handle client routing, return all requests to the app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('🚀'));
