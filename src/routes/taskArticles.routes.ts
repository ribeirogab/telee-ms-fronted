import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import WriterAssumeTaskService from '../services/WriterAssumeTaskService';
import UpdateArticleService from '../services/UpdateArticleService';

const taskArticlesRouter = Router();

taskArticlesRouter.use(ensureAuthenticated);

taskArticlesRouter.patch('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const writerId = req.user.id;

  const assumedTask = await new WriterAssumeTaskService().execute({
    taskId,
    writerId,
  });

  return res.json(assumedTask);
});

taskArticlesRouter.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { words, article } = req.body;
  const writerId = req.user.id;

  const updatedTask = await new UpdateArticleService().execute({
    taskId,
    writerId,
    words,
    article,
  });

  return res.json(updatedTask);
});

export default taskArticlesRouter;
