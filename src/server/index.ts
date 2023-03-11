import express from 'express';
import path from 'path';
import { getAllNotes } from './notes';

const notesRouter = express.Router();

notesRouter.get('/', (_req, res) => {
  res.send(getAllNotes());
});

const apiRouter = express.Router();

apiRouter.use('/notes', notesRouter);

const app = express();

app.use('/api', apiRouter);

// Serve app production bundle
app.use(express.static('dist/client'));

// Handle client routing, return all requests to the app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('🚀'));
