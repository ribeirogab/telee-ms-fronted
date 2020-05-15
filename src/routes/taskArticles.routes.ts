import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import WriterAssumeTaskService from '../services/WriterAssumeTaskService';
import UpdateArticleService from '../services/UpdateArticleService';

const taskArticlesRouter = Router();

taskArticlesRouter.use(ensureAuthenticated);

taskArticlesRouter.patch('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { writerId } = req.body;

    const assumedTask = await new WriterAssumeTaskService().execute({
      taskId,
      writerId,
    });

    return res.json(assumedTask);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

taskArticlesRouter.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { writerId, words, article } = req.body;

    const updatedTask = await new UpdateArticleService().execute({
      taskId,
      writerId,
      words,
      article,
    });

    return res.json(updatedTask);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default taskArticlesRouter;
