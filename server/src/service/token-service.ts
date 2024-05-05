import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Types } from 'mongoose';
import ServerSideError from '../errors/server-side-error';
import tokenModel from '../models/token';

const { JWT_SECRET } = process.env;

class TokenService {
  generateTokens(payload: { id: string; name: string; email: string; passport: string }) {
    if (!JWT_SECRET) {
      throw new ServerSideError('Process.env error');
    }
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '20s' });
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await tokenModel.findById(userId);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

export default new TokenService();
