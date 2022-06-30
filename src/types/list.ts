import { Types } from "mongoose"

export type TList = {
  _id: Types.ObjectId;
  boardId: Types.ObjectId;
  title: string;
  cardsId: Types.ObjectId[];
}