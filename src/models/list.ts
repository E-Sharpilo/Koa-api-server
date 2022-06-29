import { model, Schema } from 'mongoose';
import { TList } from '../types/list';

const listSchema = new Schema<TList>({
  _id: Schema.Types.ObjectId,
  title: {type: String, required: true},
  cardsId:[{type: Schema.Types.ObjectId, ref:'Card'}]
},{
  versionKey: false
})

export const List = model<TList>('List', listSchema);