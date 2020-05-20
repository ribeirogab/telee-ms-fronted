import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();

    if (!user) throw new AppError('Wrong email or password.');

    const matchingPasswords = await compare(password, user.password);
    if (!matchingPasswords) throw new AppError('Wrong email or password.');

    try {
      const token = sign(
        { nameUser: user.name, permission: user.permission },
        process.env.SECRET as string,
        {
          subject: user.id,
          expiresIn: '1d',
        },
      );

      delete user.password;

      return { user, token };
    } catch (error) {
      throw new AppError('Error generating token.');
    }
  }
}

export default CreateSessionService;
