import { model, Schema } from 'mongoose';
import { TTag } from '../types/tag';


const tagSchema = new Schema<TTag>({
  _id: Schema.Types.ObjectId,
  boardId: Schema.Types.ObjectId,
  title: { type: String, required: true },
  color: { type: String }
}, {
  versionKey: false
})

export const Tag = model<TTag>('Tag', tagSchema);