import User, { User as TUser } from '../models/users';
import bcrypt from 'bcrypt';
import TokenService from './token-service';
import { FIND_USER_ERROR, INCORRECT_PASSWORD } from '../constants/messages';
import { JwtPayload } from 'jsonwebtoken';

class UserService {
  async registration(userFields: TUser, payload: { name: string; email: string; passport: string }) {
    const { password, ...rest } = userFields;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUSer = await User.create({ ...rest, password: hashedPassword });
    const tokens = TokenService.generateTokens({ id: newUSer._id.toString(), ...payload });
    await TokenService.saveToken(newUSer._id, tokens.refreshToken);
    const { _id, name, email, role, passport } = newUSer;
    return {
      ...tokens,
      _id,
      name,
      email,
      role,
      passport,
    };
  }
  async getUsers() {
    return await User.find();
  }
  async login(authData: string | { id: string | JwtPayload; password: string }) {
    if (typeof authData === 'string') {
      return await User.findById(authData);
    }
    const user = await User.findById(authData.id);
    if (!user) {
      return { message: FIND_USER_ERROR };
    }
    const passwordFromBd = user.password;
    const isCorrectPassword = await bcrypt.compare(passwordFromBd, authData.password);
    if (!isCorrectPassword) {
      return { message: INCORRECT_PASSWORD };
    }
    return user;
  }
  async deleteUser(userId: string) {
    return await User.findByIdAndDelete(userId);
  }
}

export default new UserService();
