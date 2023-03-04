import express from 'express';
import { getAllNotes } from './notes';

const notesRouter = express.Router();

notesRouter.get('/', (_req, res) => {
  res.send(getAllNotes());
});

const apiRouter = express.Router();

apiRouter.use('/notes', notesRouter);

const app = express();

app.use('/api', apiRouter);

app.listen(process.env.PORT || 8080, () => console.log('🚀'));
