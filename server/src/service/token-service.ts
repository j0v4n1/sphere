import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Types } from 'mongoose';
import tokenModel from '../models/token';
import Token from '../models/token';
import ApiError from '../errors/api-error';

class TokenService {
  generateTokens(payload: { id: string; name: string; email: string; passport: string }) {
    if (!process.env.JWT_SECRET) {
      throw ApiError.serverSideError('секретный ключ');
    }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
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
    return await tokenModel.create({ user: userId, refreshToken });
  }

  async deleteToken(refreshToken: string) {
    const token = await Token.findOne({ refreshToken });
    if (!token) {
      throw ApiError.serverSideError('токен');
    }
    return token.deleteOne();
  }
}

export default new TokenService();
