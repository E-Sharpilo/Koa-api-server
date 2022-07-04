import mongoose, { Schema } from "mongoose";
import { TBoard } from "../types/board";

const boardSchema = new Schema<TBoard>(
  {
    _id: Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    listsId: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  {
    versionKey: false,
  }
);

export const Board = mongoose.model<TBoard>("Board", boardSchema);
