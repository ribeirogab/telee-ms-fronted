import { getRepository } from 'typeorm';

import User from '../models/User';

class ListUserService {
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
      throw Error('Invalid permission');
    }

    const usersOfThisPermission = await usersRepository.find({
      where: { permission },
    });

    return usersOfThisPermission;
  }
}

export default ListUserService;
