import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Article from '../models/Article';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  writerId: string;
  articleId: string;
}

class UpdateArticleService {
  public async execute({ writerId, articleId }: Request): Promise<Article> {
    const usersRepository = getRepository(User);
    const articlesRepository = getRepository(Article);
    const tasksRepository = getRepository(Task);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw new AppError('Invalid writer ID.');
    }

    const articleToBeUpdated = await articlesRepository.findOne(articleId);

    if (!articleToBeUpdated) {
      throw new AppError('Invalid article ID.');
    }

    if (articleToBeUpdated.fk_writer !== writerId) {
      throw new AppError('You can only deliver your articles.', 403);
    }

    const taskToBeDelivered = await tasksRepository.findOne(
      articleToBeUpdated.fk_task,
    );

    if (!taskToBeDelivered) {
      throw new AppError('Invalid task ID.');
    }

    if (
      taskToBeDelivered.status !== 'writing' &&
      taskToBeDelivered.status !== 'returned'
    ) {
      throw new AppError('Only "writing" tasks can be delivered.', 403);
    }

    await tasksRepository.update(taskToBeDelivered.id, {
      status: 'pending',
    });

    await articlesRepository.update(articleToBeUpdated.id, {
      delivered_at: new Date(),
    });

    const deliveredArticle = await articlesRepository.findOne(
      articleToBeUpdated.id,
    );

    if (!deliveredArticle) {
      throw new AppError('Error returning task.', 500);
    }

    return deliveredArticle;
  }
}

export default UpdateArticleService;
