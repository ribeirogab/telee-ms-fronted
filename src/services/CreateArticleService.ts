import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Article from '../models/Article';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  writerId: string;
  taskId: string;
}

class CreateTaskService {
  public async execute({ writerId, taskId }: Request): Promise<Article> {
    const articlesRepository = getRepository(Article);
    const tasksRepository = getRepository(Task);
    const usersRepository = getRepository(User);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw new AppError('Invalid writer ID.');
    }

    if (writer.permission !== 'writer') {
      throw new AppError('Only writers can assume tasks.', 401);
    }

    const task = await tasksRepository.findOne(taskId);

    if (!task) {
      throw new AppError('Invalid task ID.');
    }

    if (task.status !== 'available') {
      throw new AppError('Only available tasks can be assumed.', 403);
    }

    const taskAlreadyHasArticle = await articlesRepository.findOne({
      where: { fk_task: taskId },
    });

    if (taskAlreadyHasArticle) {
      throw new AppError('This task already has an article.');
    }

    const article = articlesRepository.create({
      fk_writer: writerId,
      fk_task: taskId,
      words: 0,
      value: 0,
      article: '',
      delivered_at: '...',
    });

    task.status = 'writing';

    await articlesRepository.save(article);
    await tasksRepository.save(task);

    return article;
  }
}

export default CreateTaskService;
