import { model, Schema } from 'mongoose';
import { TList } from '../types/list';

const listSchema = new Schema<TList>({
  _id: Schema.Types.ObjectId,
  boardId:  Schema.Types.ObjectId,
  title: {type: String, required: true}
},{
  versionKey: false
})

export const List = model<TList>('List', listSchema);