import { Types } from "mongoose"

export type TCard = {
  _id: Types.ObjectId;
  listId: Types.ObjectId;
  boardId: Types.ObjectId;
  title: string;
  description: string;
}