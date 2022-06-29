import { Types } from "mongoose"

export type Tag = {
  _id: Types.ObjectId;
  text?: string;
  color: string;
}