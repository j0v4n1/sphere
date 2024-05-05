import { INCORRECT_DATA_CODE } from '../constants/errors';

export default class IncorrectData extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = INCORRECT_DATA_CODE;
  }
}
