import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  userId: string;
  userIdToBeDeleted: string;
}

class DeleteUserService {
  public async execute({ userId, userIdToBeDeleted }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const userToBeDeleted = await usersRepository.findOne(userIdToBeDeleted);

    if (!userToBeDeleted) {
      throw new AppError('User does not exists.');
    }

    if (userToBeDeleted.permission === 'administrator') {
      const user = await usersRepository.findOne(userId);

      if (!user) {
        throw new AppError('User does not exists.');
      }

      if (user.permission !== 'developer') {
        throw new AppError('A administrator does not to be deleted', 403);
      }
    }

    await usersRepository.remove(userToBeDeleted);
  }
}

export default DeleteUserService;
