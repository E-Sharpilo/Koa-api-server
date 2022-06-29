import { Types } from "mongoose"

export type TBoard = {
  _id: Types.ObjectId;
  title: string;
  listsId: Types.ObjectId[]
}