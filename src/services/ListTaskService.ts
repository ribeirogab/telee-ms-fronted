import { getCustomRepository } from 'typeorm';

import Task from '../models/Task';
import TasksRepository from '../repositories/TasksRepository';

class ListUserService {
  public async execute(status: string | string[] | undefined): Promise<Task[]> {
    const tasksRepository = getCustomRepository(TasksRepository);

    if (!status) {
      const allTasks = await tasksRepository.find();
      return allTasks;
    }

    if (
      status !== 'available' &&
      status !== 'writing' &&
      status !== 'pending' &&
      status !== 'returned' &&
      status !== 'accepted' &&
      status !== 'recused'
    ) {
      throw Error('Invalid status');
    }

    const tasksWithThisStatus = await tasksRepository.find({
      where: { status },
    });

    return tasksWithThisStatus;
  }
}

export default ListUserService;
