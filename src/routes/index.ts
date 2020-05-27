import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import updatesRouter from './updates.routes';
import tasksRouter from './tasks.routes';
import tasksWriter from './tasksWriter.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/updates', updatesRouter);
routes.use('/tasks', tasksRouter);
routes.use('/tasks-writer', tasksWriter);

routes.get('/', (req, res) => {
  res.json({ isRunning: true });
});

export default routes;
