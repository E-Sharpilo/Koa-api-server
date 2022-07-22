import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';
import { config } from '../config/config';
import { Token } from '../models/token';

interface User {
  email: string;
  id: Types.ObjectId
}

export class TokenService {
  generateTokens(payload: User) {
    const accessToken = jwt.sign(payload, config.tokens.access, {expiresIn: '10min'})
    const refreshToken = jwt.sign(payload, config.tokens.refresh, {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await Token.findOne({user: userId})

    if(tokenData) {
      tokenData.refreshToken = refreshToken

      return tokenData.save()
    }

    const token = await Token.create({user: userId, refreshToken})

    return 
  }
}