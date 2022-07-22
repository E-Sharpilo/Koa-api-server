import {Schema, model} from 'mongoose'
import { TToken } from '../types/token';

const tokenSchema = new Schema<TToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true},
  },
  {
    versionKey: false,
  }
);

export const Token = model<TToken>('Token', tokenSchema);