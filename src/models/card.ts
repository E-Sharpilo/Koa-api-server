import { model, Schema } from 'mongoose';
import { TCard } from '../types/card';

const cardSchema = new Schema<TCard>({
  _id: Schema.Types.ObjectId,
  cardTitle: { type: String, required: true },
  tag: [{
    _id: { type: Schema.Types.ObjectId },
    text: { type: String },
    color: { type: String },
  }]
}, {
  versionKey: false
})

export const Card = model<TCard>('Card', cardSchema);