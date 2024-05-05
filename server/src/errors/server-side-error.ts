import { SERVER_SIDE_ERROR_CODE } from '../constants/errors';

export default class ServerSideError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = SERVER_SIDE_ERROR_CODE;
  }
}
