import { getRepository } from 'typeorm';

import User from '../models/User';

class DeleteUserService {
  public async execute(userId: string): Promise<void> {
    const usersRepository = getRepository(User);

    const userToBeDeleted = await usersRepository.findOne(userId);

    if (!userToBeDeleted) {
      throw Error('User does not exists.');
    }

    if (userToBeDeleted.permission === 'administrator') {
      throw Error('A administrator does not to be deleted');
    }

    await usersRepository.remove(userToBeDeleted);
  }
}

export default DeleteUserService;
