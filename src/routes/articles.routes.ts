import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Article from '../models/Article';

import CreateArticleService from '../services/CreateArticleService';
import UpdateArticleService from '../services/UpdateArticleService';
import DeliverArticleService from '../services/DeliverArticleService';

const articlesRouter = Router();

articlesRouter.use(ensureAuthenticated);

articlesRouter.get('/', async (req, res) => {
  const articlesRepository = getRepository(Article);

  const articles = await articlesRepository.find();

  return res.json(articles);
});

articlesRouter.get('/:articleId', async (req, res) => {
  const { articleId } = req.params;
  const articlesRepository = getRepository(Article);

  const article = await articlesRepository.findOne(articleId);

  return res.json(article);
});

articlesRouter.get('/from/writer', async (req, res) => {
  const articlesRepository = getRepository(Article);
  const writerId = req.user.id;

  const articles = await articlesRepository.find({
    where: { fk_writer: writerId },
  });

  return res.json(articles);
});

articlesRouter.post('/:taskId', async (req, res) => {
  const writerId = req.user.id;
  const { taskId } = req.params;

  const article = await new CreateArticleService().execute({
    writerId,
    taskId,
  });

  return res.json(article);
});

articlesRouter.put('/:articleId', async (req, res) => {
  const { words, article } = req.body;
  const writerId = req.user.id;
  const { articleId } = req.params;

  const articleUpdated = await new UpdateArticleService().execute({
    writerId,
    articleId,
    words,
    article,
  });

  return res.json(articleUpdated);
});

articlesRouter.patch('/:articleId', async (req, res) => {
  const writerId = req.user.id;
  const { articleId } = req.params;

  const articleDelivered = await new DeliverArticleService().execute({
    writerId,
    articleId,
  });

  return res.json(articleDelivered);
});

export default articlesRouter;
