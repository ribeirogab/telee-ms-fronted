import { getCustomRepository, getRepository } from 'typeorm';

import Task from '../models/Task';
import User from '../models/User';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  authorId: string;
  keyword: string;
  subKeywords: string;
  website: string;
  status: 'available';
}

class CreateTaskService {
  public async execute({
    authorId,
    keyword,
    subKeywords,
    website,
    status,
  }: Request): Promise<Task> {
    const tasksRepository = getCustomRepository(TasksRepository);
    const usersRepository = getRepository(User);

    const author = await usersRepository.findOne(authorId);

    if (!author) {
      throw Error('Invalid author ID.');
    }

    if (
      author.permission !== 'editor' &&
      author.permission !== 'administrator'
    ) {
      throw Error('Only editors and administrators can create tasks.');
    }

    const task = tasksRepository.create({
      fk_author: authorId,
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
