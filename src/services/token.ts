import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../config/config";
import { Token } from "../models/token";

type User = {
  email: string;
  id: Types.ObjectId;
}

export class TokenService {
  generateTokens(payload: User) {
    const accessToken = jwt.sign(payload, config.tokens.access, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, config.tokens.refresh, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, config.tokens.access);
      return userData as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, config.tokens.refresh);
      return userData as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await Token.create({ user: userId, refreshToken });

    return;
  }

  async removeToken(refreshToken?: string) {
    const tokenData = await Token.deleteOne({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken?: string) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }
}
