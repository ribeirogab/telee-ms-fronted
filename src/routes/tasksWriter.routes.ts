import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import WriterAssumeTaskService from '../services/WriterAssumeTaskService';
import UpdateArticleService from '../services/UpdateArticleService';
import ArticlesByWriterService from '../services/ArticlesByWriterService';

const tasksWriter = Router();

tasksWriter.use(ensureAuthenticated);

tasksWriter.get('/', async (req, res) => {
  const writerId = req.user.id;

  const tasksByThisWriter = await new ArticlesByWriterService().execute(
    writerId,
  );

  return res.json(tasksByThisWriter);
});

tasksWriter.patch('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const writerId = req.user.id;

  const assumedTask = await new WriterAssumeTaskService().execute({
    taskId,
    writerId,
  });

  return res.json(assumedTask);
});

tasksWriter.put('/:taskId', async (req, res) => {
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

export default tasksWriter;
