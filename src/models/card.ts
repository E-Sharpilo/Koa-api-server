import { model, Schema } from 'mongoose';
import { TCard } from '../types/card';

const cardSchema = new Schema<TCard>({
  _id: Schema.Types.ObjectId,
  boardId: Schema.Types.ObjectId,
  listId: Schema.Types.ObjectId,
  title: { type: String, required: true },
}, {
  versionKey: false
})

export const Card = model<TCard>('Card', cardSchema);