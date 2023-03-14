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

const notesRouter = express.Router();

notesRouter.get('/', async (_req, res) => {
  res.send(await getAllNotes());
});

notesRouter.get('/:id', async (req, res) => {
  const id = await req.params.id;

  res.send(await readNote(id));
});

notesRouter.post('/', async (req, res) => {
  const { owner, title, body } = await req.body;
  res.send(await createNote(owner, title, body));
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

const apiRouter = express.Router();

apiRouter.use('/notes', notesRouter);

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
