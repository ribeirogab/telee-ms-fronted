import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import updatesRouter from './updates.routes';
import tasksRouter from './tasks.routes';
import articlesRouter from './articles.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/updates', updatesRouter);
routes.use('/tasks', tasksRouter);
routes.use('/articles', articlesRouter);

routes.get('/', (req, res) => {
  res.json({ isRunning: true });
});

export default routes;
