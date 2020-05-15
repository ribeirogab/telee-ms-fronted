import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw Error('Token does not exist');

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.SECRET as string);
    const { sub } = decoded as TokenPayload;
    req.user = { id: sub };
    return next();
  } catch (error) {
    throw Error('Invalid JWT token.');
  }
}
