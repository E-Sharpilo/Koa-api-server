import { Types } from "mongoose"

export type TToken = {
  user: Types.ObjectId;
  refreshToken: string;
}