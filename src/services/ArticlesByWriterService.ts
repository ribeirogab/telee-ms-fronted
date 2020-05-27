import { getRepository } from 'typeorm';

import Task from '../models/Task';

class ArticlesByThisWriterService {
  public async execute(writerId: string): Promise<Task[]> {
    const tasksRepository = getRepository(Task);

    const tasksByWriter = await tasksRepository.find({
      where: { fk_writer: writerId },
    });

    return tasksByWriter;
  }
}

export default ArticlesByThisWriterService;
