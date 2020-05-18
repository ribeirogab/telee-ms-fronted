import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

class ListUsersService {
  public async execute(permission: string | string[] | null): Promise<User[]> {
    const usersRepository = getRepository(User);

    if (!permission) {
      const allUsers = await usersRepository.find();
      return allUsers;
    }

    if (
      permission !== 'writer' &&
      permission !== 'editor' &&
      permission !== 'administrator'
    ) {
      throw new AppError('Invalid permission');
    }

    const usersOfThisPermission = await usersRepository.find({
      where: { permission },
    });

    return usersOfThisPermission;
  }
}

export default ListUsersService;
