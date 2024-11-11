import express from 'express';
import { MongoClient } from 'mongodb';

import { createAuthorizationService } from './authorization_service';
import { createLibraryService } from './library_service';
import { createAuthorizationMiddleware, createErrorInterceptor } from './middlewares';

const app = express();
const port = 1234;

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING!);

app.use(express.json());

async function bootstrap() {
  await client.connect();

  const db = client.db('moviego');

  const authorizationService = createAuthorizationService(db, process.env.SIGNER_SECRET!);

  app.post('/api/register', async (req, res) => {
    await authorizationService.register({
      name: req.body.name,
      password: req.body.password,
    });

    res.send();
  });

  app.post('/api/login', async (req, res) => {
    const token = await authorizationService.authenticate({
      name: req.body.name,
      password: req.body.password,
    });

    res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.send();
  });

  const protectedRoutes = express.Router();
  protectedRoutes.use(createAuthorizationMiddleware(
    authorizationService,
    user => ({
      libraryService: createLibraryService(db, user),
    }),
  ));

  protectedRoutes.get('/library/watched', async (req, res) => {
    const movies = await req.libraryService!.listWatched();
    res.send(movies);
  });
  protectedRoutes.get('/library/queued', async (req, res) => {
    const movies = await req.libraryService!.listQueued();
    res.send(movies);
  });
  protectedRoutes.post('/library/watched', async (req, res) => {
    const movies = await req.libraryService!.addToWatched(req.body);
    res.send(movies);
  });
  protectedRoutes.post('/library/queued', async (req, res) => {
    const movies = await req.libraryService!.addToQueueed(req.body);
    res.send(movies);
  });
  protectedRoutes.delete('/library/:id/watched', async (req, res) => {
    const movies = await req.libraryService!.removeFromWatched(parseInt(req.params.id));
    res.send(movies);
  });
  protectedRoutes.delete('/library/:id/queued', async (req, res) => {
    const movies = await req.libraryService!.removeFromQueued(parseInt(req.params.id));
    res.send(movies);
  });

  app.use('/api/user', protectedRoutes);
  app.use(createErrorInterceptor());

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

bootstrap();
