import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type User = {
  id: string;
  name: string;
  email: string;
  passport: string;
  iat: number;
  exp: number;
};

export interface ExtendedRequest extends Request {
  user: User;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export {};
