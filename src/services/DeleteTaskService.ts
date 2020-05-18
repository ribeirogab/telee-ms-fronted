import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  taskId: string;
  userId: string;
}

class DeleteTaskService {
  public async execute({ taskId, userId }: Request): Promise<void> {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('Invalid user.');
    }

    if (user.permission !== 'editor' && user.permission !== 'administrator') {
      throw new AppError('Only editors and administrators can delete tasks.');
    }

    const taskToBeDeleted = await tasksRepository.findOne(taskId);

    if (!taskToBeDeleted) {
      throw new AppError('User does not exists.');
    }

    if (taskToBeDeleted.status !== 'available') {
      throw new AppError('tasks already started cannot be deleted', 403);
    }

    await tasksRepository.remove(taskToBeDeleted);
  }
}

export default DeleteTaskService;
