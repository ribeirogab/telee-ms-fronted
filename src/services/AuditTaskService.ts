import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  taskId: string;
  userId: string;
  status: 'refused' | 'okay' | 'returned';
}

class EditorAuditTaskService {
  async execute({ taskId, userId, status }: Request): Promise<Task> {
    const tasksRepository = getRepository(Task);
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) throw new AppError('User does not exists');

    if (
      user.permission !== 'editor' &&
      user.permission !== 'administrator' &&
      user.permission !== 'developer'
    )
      throw new AppError('Only editors can audit tasks', 401);

    const task = await tasksRepository.findOne(taskId);

    if (!task) throw new AppError('Task does not exists');

    if (task.status !== 'pending')
      throw new AppError('Only pending tasks can be audited.', 401);

    task.status = status;

    await tasksRepository.save(task);

    return task;
  }
}

export default EditorAuditTaskService;
