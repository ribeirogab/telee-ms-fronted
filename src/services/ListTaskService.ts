import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Task from '../models/Task';

class ListTaskService {
  public async execute(status: string | string[] | undefined): Promise<Task[]> {
    const tasksRepository = getRepository(Task);

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
      throw new AppError('Invalid status');
    }

    const tasksWithThisStatus = await tasksRepository.find({
      where: { status },
    });

    return tasksWithThisStatus;
  }
}

export default ListTaskService;
