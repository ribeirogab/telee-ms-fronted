import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';
import Task from '../models/Task';
import Article from '../models/Article';

interface Request {
  taskId: string;
  userId: string;
}

class DeleteTaskService {
  public async execute({ taskId, userId }: Request): Promise<void> {
    const tasksRepository = getRepository(Task);
    const usersRepository = getRepository(User);
    const articlesRepository = getRepository(Article);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('Invalid user.');
    }

    if (
      user.permission !== 'editor' &&
      user.permission !== 'administrator' &&
      user.permission !== 'developer'
    ) {
      throw new AppError('Only editors and administrators can delete tasks.');
    }

    const taskToBeDeleted = await tasksRepository.findOne(taskId);

    if (!taskToBeDeleted) {
      throw new AppError('Task does not exists.');
    }

    if (taskToBeDeleted.status !== 'available') {
      throw new AppError('tasks already started cannot be deleted', 403);
    }

    const articleToBeDeleted = await articlesRepository.findOne({
      where: { fk_task: taskToBeDeleted.id },
    });

    await tasksRepository.remove(taskToBeDeleted);

    if (articleToBeDeleted) await articlesRepository.remove(articleToBeDeleted);
  }
}

export default DeleteTaskService;
