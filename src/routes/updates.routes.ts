import { Router } from 'express';
import { getRepository } from 'typeorm';

import Update from '../models/Update';

const updatesRouter = Router();

updatesRouter.get('/', async (req, res) => {
  const updatesRepository = getRepository(Update);

  const updates = await updatesRepository.find();

  return res.json(updates);
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

export default updatesRouter;
