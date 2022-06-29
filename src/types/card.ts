import { Tag } from "./tag";
import { Types } from "mongoose"

export type TCard = {
  _id: Types.ObjectId;
  cardTitle: string;
  tag?: Tag[];
  description?: string;
}