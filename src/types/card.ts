import { Types } from "mongoose"

export type TCard = {
  _id: Types.ObjectId;
  boardId: Types.ObjectId;
  listId:Types.ObjectId;
  title: string;
  description: string;
  tagsId: Types.ObjectId[];
}