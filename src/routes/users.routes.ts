import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (req, res) => {
  try {
    const { permission } = req.headers;

    const users = await new ListUserService().execute(permission || null);

    return res.json(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const { name, username, password, permission } = req.body;

    const user = await new CreateUserService().execute({
      name,
      username,
      password,
      permission,
    });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

usersRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    await new DeleteUserService().execute(userId);

    return res.json({ message: 'User deleted with successfuly.' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default usersRouter;
