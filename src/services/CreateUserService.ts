import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  username: string;
  password: string;
  permission: 'writer' | 'editor' | 'administrator';
}

class CreateUserService {
  public async execute({
    name,
    username,
    password,
    permission,
  }: Request): Promise<User> {
    if (
      permission !== 'writer' &&
      permission !== 'editor' &&
      permission !== 'administrator'
    ) {
      throw new AppError('Invalid permission', 401);
    }

    const usersRepository = getRepository(User);

    const usernameExists = await usersRepository.findOne({
      where: { username },
    });

    if (usernameExists) {
      throw new AppError('Username is already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      username,
      password: hashedPassword,
      permission,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
