import { Types } from "mongoose"

export type TTag = {
  _id: Types.ObjectId;
  boardId: Types.ObjectId;
  title?: string;
  color: string;
}