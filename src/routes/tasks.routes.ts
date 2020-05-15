import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import TasksRepository from '../repositories/TasksRepository';
import ListTaskService from '../services/ListTaskService';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';

const tasksRouter = Router();

tasksRouter.use(ensureAuthenticated);

tasksRouter.get('/', async (req, res) => {
  try {
    const { status } = req.headers;

    const tasks = await new ListTaskService().execute(status);

    return res.json(tasks);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

tasksRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const tasksRepository = getCustomRepository(TasksRepository);

  const task = await tasksRepository.findOne(id);

  return res.json(task);
});

tasksRouter.post('/', async (req, res) => {
  try {
    const { authorId, keyword, subKeywords, website } = req.body;

    const task = await new CreateTaskService().execute({
      authorId,
      keyword,
      subKeywords,
      website,
      status: 'available',
    });

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

tasksRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { keyword, subKeywords, website } = req.body;

    const task = await new UpdateTaskService().execute({
      id,
      keyword,
      subKeywords,
      website,
    });

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

tasksRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await new DeleteTaskService().execute(id);
    return res.json({ message: 'Task deleted with successfuly.' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default tasksRouter;
