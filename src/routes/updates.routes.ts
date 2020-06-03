import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import Update from '../models/Update';

const updatesRouter = Router();

updatesRouter.use(ensureAuthenticated);

updatesRouter.get('/', async (req, res) => {
  const updatesRepository = getRepository(Update);

  const updates = await updatesRepository.find({ order: { version: 'DESC' } });

  return res.json(updates);
});

updatesRouter.get('/:updateId', async (req, res) => {
  const { updateId } = req.params;
  const updatesRepository = getRepository(Update);

  const update = await updatesRepository.findOne(updateId);

  return res.json(update);
});

updatesRouter.post('/', async (req, res) => {
  const { version, title, description } = req.body;

  const updatesRepository = getRepository(Update);

  const update = updatesRepository.create({
    version,
    title,
    description,
  });

  await updatesRepository.save(update);

  return res.json(update);
});

updatesRouter.put('/:updateId', async (req, res) => {
  const { updateId } = req.params;
  const { version, title, description } = req.body;
  const updatesRepository = getRepository(Update);

  await updatesRepository.update(updateId, { version, title, description });

  const update = await updatesRepository.findOne(updateId);

  return res.json(update);
});

updatesRouter.delete('/:updateId', async (req, res) => {
  const { updateId } = req.params;
  const updatesRepository = getRepository(Update);

  await updatesRepository.delete(updateId);

  return res.status(204).send();
});

export default updatesRouter;
