import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import User from '../models/User';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  taskId: string;
  writerId: string;
}

class WriterAssumeTaskService {
  public async execute({ taskId, writerId }: Request): Promise<Task> {
    const usersRepository = getRepository(User);
    const tasksRepository = getCustomRepository(TasksRepository);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw new AppError('Invalid writer ID.');
    }

    if (writer.permission !== 'writer') {
      throw new AppError('Only writers can take on tasks.', 401);
    }

    const taskToBeAssumed = await tasksRepository.findOne(taskId);

    if (!taskToBeAssumed) {
      throw new AppError('Invalid task ID.');
    }

    if (taskToBeAssumed.status !== 'available') {
      throw new AppError('Only available tasks can be assumed.', 403);
    }

    await tasksRepository.update(taskId, {
      fk_writer: writer.id,
      assumed: new Date(),
      status: 'writing',
    });

    const updatedTask = await tasksRepository.findOne(taskId);

    if (!updatedTask) {
      throw new AppError('Error returning task.', 500);
    }

    return updatedTask;
  }
}

export default WriterAssumeTaskService;
