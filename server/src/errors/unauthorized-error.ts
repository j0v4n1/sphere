import { UNAUTHORIZED_CODE } from '../constants/errors';

export default class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED_CODE;
  }
}
