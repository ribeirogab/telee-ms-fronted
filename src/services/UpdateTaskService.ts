import { getCustomRepository } from 'typeorm';

import Task from '../models/Task';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  id: string;
  keyword: string;
  subKeywords: string;
  website: string;
}

class UpdateTaskService {
  public async execute({
    id,
    keyword,
    subKeywords,
    website,
  }: Request): Promise<Task> {
    const tasksRepository = getCustomRepository(TasksRepository);

    const taskExists = await tasksRepository.findOne(id);

    if (!taskExists) {
      throw Error('Task does not exists.');
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
