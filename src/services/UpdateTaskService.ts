import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  taskId: string;
  userId: string;
  keyword: string;
  subKeywords: string;
  website: string;
}

class UpdateTaskService {
  public async execute({
    taskId,
    userId,
    keyword,
    subKeywords,
    website,
  }: Request): Promise<Task> {
    const tasksRepository = getRepository(Task);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('Invalid user.');
    }

    if (user.permission !== 'editor' && user.permission !== 'administrator') {
      throw new AppError('Only editors and administrators can edit tasks.');
    }

    const taskExists = await tasksRepository.findOne(taskId);

    if (!taskExists) {
      throw new AppError('Task does not exists.');
    }

    const updatedTask = {
      ...taskExists,
      keyword,
      sub_keywords: subKeywords,
      website,
    };

    await tasksRepository.save(updatedTask);

    return updatedTask;
  }
}

export default UpdateTaskService;
