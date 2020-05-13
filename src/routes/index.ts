import { Router } from 'express';

import usersRouter from './users.routes';
import updatesRouter from './updates.routes';
import tasksRouter from './tasks.routes';
import articlesRouter from './articles.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/updates', updatesRouter);
routes.use('/tasks', tasksRouter);
routes.use('/articles', articlesRouter);

export default routes;
