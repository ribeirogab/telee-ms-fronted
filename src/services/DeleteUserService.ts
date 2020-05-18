import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

class DeleteUserService {
  public async execute(userId: string): Promise<void> {
    const usersRepository = getRepository(User);

    const userToBeDeleted = await usersRepository.findOne(userId);

    if (!userToBeDeleted) {
      throw new AppError('User does not exists.');
    }

    if (userToBeDeleted.permission === 'administrator') {
      throw new AppError('A administrator does not to be deleted', 403);
    }

    await usersRepository.remove(userToBeDeleted);
  }
}

export default DeleteUserService;
