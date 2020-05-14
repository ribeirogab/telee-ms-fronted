import { getCustomRepository, getRepository } from 'typeorm';

import Task from '../models/Task';
import User from '../models/User';
import TasksRepository from '../repositories/TasksRepository';

interface Request {
  taskId: string;
  writerId: string;
  words: string;
  article: string;
}

class UpdateArticleService {
  public async execute({
    taskId,
    writerId,
    words,
    article,
  }: Request): Promise<Task> {
    const usersRepository = getRepository(User);
    const tasksRepository = getCustomRepository(TasksRepository);

    const writer = await usersRepository.findOne(writerId);

    if (!writer) {
      throw Error('Invalid writer ID.');
    }

    const taskToBeUpdated = await tasksRepository.findOne(taskId);

    if (!taskToBeUpdated) {
      throw Error('Invalid task ID.');
    }

    if (
      taskToBeUpdated.status === 'available' ||
      taskToBeUpdated.status === 'accepted' ||
      taskToBeUpdated.status === 'recused'
    ) {
      throw Error(
        'Tasks with status: available, accepted, recused.\nCannot be edited.',
      );
    }

    if (taskToBeUpdated.fk_writer !== writer.id) {
      throw Error('You can only change your tasks.');
    }

    taskToBeUpdated.words = Number(words);
    taskToBeUpdated.value = Number(words) * 0.06;
    taskToBeUpdated.article = article;

    await tasksRepository.save(taskToBeUpdated);

    return taskToBeUpdated;
  }
}

export default UpdateArticleService;
