import { getCustomRepository } from 'typeorm';

import Task from '../models/Task';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  author: string;
  keyword: string;
  subKeywords: string;
  website: string;
  status: 'available';
}

class CreateTaskService {
  public async execute({
    author,
    keyword,
    subKeywords,
    website,
    status,
  }: Request): Promise<Task> {
    const tasksRepository = getCustomRepository(TasksRepository);

    const task = tasksRepository.create({
      author,
      keyword,
      sub_keywords: subKeywords,
      website,
      status,
    });

    await tasksRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
