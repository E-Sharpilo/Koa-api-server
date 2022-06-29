import { Types } from "mongoose"

export type TList = {
  _id: Types.ObjectId;
  title: string;
  cardsId: string[];
}