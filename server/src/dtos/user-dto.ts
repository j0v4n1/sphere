import { HydratedDocument } from 'mongoose';
import { User } from '../models/users';

export default class UserDto {
  name: string;
  email: string;
  passport: string;
  role: string;
  constructor(userModel: any) {
    this.name = userModel.name;
    this.email = userModel.email;
    this.passport = userModel.passport;
    this.role = userModel.role;
  }
}
