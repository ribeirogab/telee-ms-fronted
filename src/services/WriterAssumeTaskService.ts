import { getCustomRepository, getRepository } from 'typeorm';

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
      throw Error('Invalid writer ID.');
    }

    if (writer.permission !== 'writer') {
      throw Error('Only writers can take on tasks.');
    }

    const taskToBeAssumed = await tasksRepository.findOne(taskId);

    if (!taskToBeAssumed) {
      throw Error('Invalid task ID.');
    }

    if (taskToBeAssumed.status !== 'available') {
      throw Error('Only available tasks can be assumed.');
    }

    await tasksRepository.update(taskId, {
      fk_writer: writer.id,
      assumed: new Date(),
      status: 'writing',
    });

    const updatedTask = await tasksRepository.findOne(taskId);

    if (!updatedTask) {
      throw Error('Error returning task.');
    }

    return updatedTask;
  }
}

export default WriterAssumeTaskService;
