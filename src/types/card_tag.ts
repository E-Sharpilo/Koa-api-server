import { Types } from "mongoose"

export type TCard_Tag = {
  _id: Types.ObjectId;
  cardId: Types.ObjectId;
  tagId: Types.ObjectId;
}