import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  taskId: string;
  writerId: string;
  words: string;
  article: string;
}

class UpdateArticleService {
  public async execute({
    taskId,
    writerId,
    words,
    article,
  }: Request): Promise<Task> {
    const usersRepository = getRepository(User);
    const tasksRepository = getRepository(Task);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw new AppError('Invalid writer ID.');
    }

    const taskToBeUpdated = await tasksRepository.findOne(taskId);

    if (!taskToBeUpdated) {
      throw new AppError('Invalid task ID.');
    }

    if (
      taskToBeUpdated.status === 'available' ||
      taskToBeUpdated.status === 'accepted' ||
      taskToBeUpdated.status === 'recused'
    ) {
      throw new AppError(
        'Tasks with status: available, accepted, recused.\nCannot be edited.',
        403,
      );
    }

    if (taskToBeUpdated.fk_writer !== writer.id) {
      throw new AppError('You can only change your tasks.', 401);
    }

    taskToBeUpdated.words = Number(words);
    taskToBeUpdated.value = Number(words) * 0.06;
    taskToBeUpdated.article = article;

    await tasksRepository.save(taskToBeUpdated);

    return taskToBeUpdated;
  }
}

export default UpdateArticleService;
