import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

class ListUsersService {
  public async execute(userId: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (
      user.permission !== 'writer' &&
      user.permission !== 'editor' &&
      user.permission !== 'administrator'
    ) {
      throw new AppError('Invalid permission');
    }

    return user;
  }
}

export default ListUsersService;
