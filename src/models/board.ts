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
    }
  },
  {
    versionKey: false,
  }
);

export const Board = mongoose.model<TBoard>("Board", boardSchema);
