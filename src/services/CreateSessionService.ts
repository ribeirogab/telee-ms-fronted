import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

    const user = await usersRepository.findOne({ where: { username } });
    if (!user) throw Error('Wrong email or password.');

    const matchingPasswords = await compare(password, user.password);
    if (!matchingPasswords) throw Error('Wrong email or password.');

    try {
      const token = sign({}, process.env.SECRET as string, {
        subject: user.id,
        expiresIn: '1d',
      });

      return { user, token };
    } catch (error) {
      throw Error('Error generating token.');
    }
  }
}

export default CreateSessionService;
