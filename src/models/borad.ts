import { model, Schema, Document } from 'mongoose';

interface IBoard extends Document {
  listArray?: List[];
}

interface List {
  title?: string;
  cards?: Card[]
}

interface Card {
  cardTitle?: string;
  label?: Label[]
  description?: string
}

interface Label {
  text?: string;
  color?: string;
}

const boardSchema = new Schema<IBoard>({
  listArray: [
    {
      title: String,
      cards: [
        {
          cardTitle: String,
          description: String,
          label: [
            {
              text: String,
              color: String
            }
          ]
        }
      ]
    }
  ]
})

export const Board = model<IBoard>('Board', boardSchema);
