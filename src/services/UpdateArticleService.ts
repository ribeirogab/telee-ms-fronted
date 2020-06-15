import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Article from '../models/Article';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  writerId: string;
  articleId: string;
  words: string;
  article: string;
}

class UpdateArticleService {
  public async execute({
    writerId,
    articleId,
    words,
    article,
  }: Request): Promise<Article> {
    const usersRepository = getRepository(User);
    const articlesRepository = getRepository(Article);
    const taksRepository = getRepository(Task);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw new AppError('Invalid writer ID.');
    }

    const articleToBeUpdated = await articlesRepository.findOne(articleId);

    if (!articleToBeUpdated) {
      throw new AppError('Invalid article ID.');
    }

    const taskOwnerOfTheArticle = await taksRepository.findOne(
      articleToBeUpdated.fk_task,
    );

    if (!taskOwnerOfTheArticle) {
      throw new AppError('Invalid task ID.');
    }

    if (
      taskOwnerOfTheArticle.status === 'available' ||
      taskOwnerOfTheArticle.status === 'okay' ||
      taskOwnerOfTheArticle.status === 'refused'
    ) {
      throw new AppError(
        'Tasks with status: available, okay, refused.\nCannot be edited.',
        403,
      );
    }

    if (articleToBeUpdated.fk_writer !== writer.id) {
      throw new AppError('You can only change your tasks.', 401);
    }

    articleToBeUpdated.words = Number(words);
    articleToBeUpdated.value = Number(words) * 0.06;
    articleToBeUpdated.article = article;

    await articlesRepository.save(articleToBeUpdated);

    return articleToBeUpdated;
  }
}

export default UpdateArticleService;
