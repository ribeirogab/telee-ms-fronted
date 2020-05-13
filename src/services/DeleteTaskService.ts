import { getCustomRepository } from 'typeorm';

import TasksRepository from '../repositories/TasksRepository';

class DeleteTaskService {
  public async execute(id: string): Promise<void> {
    const tasksRepository = getCustomRepository(TasksRepository);

    const taskToBeDeleted = await tasksRepository.findOne(id);

    if (!taskToBeDeleted) {
      throw Error('User does not exists.');
    }

    if (taskToBeDeleted.status !== 'available') {
      throw Error('tasks already started cannot be deleted');
    }

    await tasksRepository.remove(taskToBeDeleted);
  }
}

export default DeleteTaskService;
