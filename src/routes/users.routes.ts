import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (req, res) => {
  const { permission } = req.headers;

  const users = await new ListUsersService().execute(permission || null);

  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, username, password, permission } = req.body;

  const user = await new CreateUserService().execute({
    name,
    username,
    password,
    permission,
  });

  delete user.password;

  return res.json(user);
});

usersRouter.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  await new DeleteUserService().execute(userId);

  return res.status(204).send();
});

export default usersRouter;
