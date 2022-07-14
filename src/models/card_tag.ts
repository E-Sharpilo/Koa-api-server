import { model, Schema } from 'mongoose';
import { TCard_Tag } from '../types/card_tag';


const card_tagSchema = new Schema<TCard_Tag>({
  _id: Schema.Types.ObjectId,
  cardId: Schema.Types.ObjectId,
  tagId: Schema.Types.ObjectId
}, {
  versionKey: false
})

export const Card_Tag = model<TCard_Tag>('Card_Tag', card_tagSchema);