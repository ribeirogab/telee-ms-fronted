import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Task from '../models/Task';

import ListTaskService from '../services/ListTaskService';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';
import AuditTaskService from '../services/AuditTaskService';

const tasksRouter = Router();

tasksRouter.use(ensureAuthenticated);

tasksRouter.get('/', async (req, res) => {
  const { status } = req.headers;

  const tasks = await new ListTaskService().execute(status);

  return res.json(tasks);
});

tasksRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const tasksRepository = getRepository(Task);

  const task = await tasksRepository.findOne(id);

  return res.json(task);
});

tasksRouter.post('/', async (req, res) => {
  const { keyword, subKeywords, website } = req.body;
  const authorId = req.user.id;

  const task = await new CreateTaskService().execute({
    authorId,
    keyword,
    subKeywords,
    website,
    status: 'available',
  });

  return res.json(task);
});

tasksRouter.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { keyword, subKeywords, website } = req.body;
  const userId = req.user.id;

  const task = await new UpdateTaskService().execute({
    taskId,
    userId,
    keyword,
    subKeywords,
    website,
  });

  return res.json(task);
});

tasksRouter.patch('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  const userId = req.user.id;

  const task = await new AuditTaskService().execute({
    taskId,
    userId,
    status,
  });

  return res.json(task);
});

tasksRouter.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  await new DeleteTaskService().execute({ taskId, userId });
  return res.status(204).send();
});

export default tasksRouter;
