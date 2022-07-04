import { Types } from "mongoose"

export type TCard = {
  _id: Types.ObjectId;
  title: string;
  description: string;
}