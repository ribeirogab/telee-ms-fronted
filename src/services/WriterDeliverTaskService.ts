import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  taskId: string;
  writerId: string;
}

class WriterDeliverTaskService {
  public async execute({ taskId, writerId }: Request): Promise<Task> {
    const usersRepository = getRepository(User);
    const tasksRepository = getCustomRepository(TasksRepository);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw new AppError('Invalid writer ID.');
    }

    if (writer.permission !== 'writer') {
      throw new AppError('Only writers can deliver tasks.', 401);
    }

    const taskToBeDelivered = await tasksRepository.findOne(taskId);

    if (!taskToBeDelivered) {
      throw new AppError('Invalid task ID.');
    }

    if (
      taskToBeDelivered.status !== 'writing' &&
      taskToBeDelivered.status !== 'returned'
    ) {
      throw new AppError('Only "writing" tasks can be delivered.', 403);
    }

    if (taskToBeDelivered.writer.id !== writerId) {
      throw new AppError('You can only deliver your tasks.', 403);
    }

    await tasksRepository.update(taskId, {
      delivered: new Date(),
      status: 'pending',
    });

    const deliveredTask = await tasksRepository.findOne(taskId);

    if (!deliveredTask) {
      throw new AppError('Error returning task.', 500);
    }

    return deliveredTask;
  }
}

export default WriterDeliverTaskService;
