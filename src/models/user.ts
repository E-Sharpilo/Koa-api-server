import {Schema, model} from 'mongoose'
import { TUser } from '../types/user';

const userSchema = new Schema<TUser>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
  },
  {
    versionKey: false,
  }
);

export const User = model<TUser>("User", userSchema);