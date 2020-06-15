import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Article from '../models/Article';

class ListArticleService {
  public async execute(
    status: string | string[] | undefined,
  ): Promise<Article[]> {
    const articlesRepository = getRepository(Article);
    const allArticles = await articlesRepository.find();

    if (!status) {
      return allArticles;
    }

    if (
      status !== 'available' &&
      status !== 'writing' &&
      status !== 'pending' &&
      status !== 'refused' &&
      status !== 'okay' &&
      status !== 'recused' &&
      status !== 'published'
    ) {
      throw new AppError('Invalid status');
    }

    const articlesWithThisStatus = allArticles.filter(
      article => article.task.status === status,
    );

    return articlesWithThisStatus;
  }
}

export default ListArticleService;
