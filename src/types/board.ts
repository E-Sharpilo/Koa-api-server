import { Types } from "mongoose"

export type TBoard = {
  _id: Types.ObjectId;
  color: string;
  title: string;
}