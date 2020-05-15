import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const { user, token } = await new CreateSessionService().execute({
    username,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
