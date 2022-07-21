import { Context } from "koa";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { Card_Tag } from "../models/card_tag";
import { TCard } from "../types/card";

export class CardService {
  async getCards(listId: string[] | string) {
    const allCards: any = await Card.find({ listId: listId }).lean();

    const promises = await allCards.map(async (card:any) => await Card_Tag.find({ cardId: card._id }, { tagId: true }))

    const tags = await Promise.all(promises)

        
    allCards.map((card: any, i: number) => {
      card.tagsId = tags[i]
    })


    if (!allCards) {
      throw new Error("Cards not found");
    }

    
    return JSON.stringify(allCards);
  }

  async getCardById(id: string) {
    const card: any = await Card.findOne({ _id: id }).lean();
    const tagsId = await Card_Tag.find({ cardId: id }, { tagId: true });
    card.tagsId = tagsId;

    if (!card) {
      throw new Error("Card not found");
    }

    return card;
  }

  async updateCard(id: string, ctx: Context) {
    await Card.updateOne(
      { _id: id },
      {
        title: ctx.request.body.title,
        description: ctx.request.body.description,
      }
    );

    const card: any = await Card.findOne({ _id: id }).lean();
    const tagsId = await Card_Tag.find({ cardId: id }, { tagId: true });
    card.tagsId = tagsId;
    return card;
  }

  async deleteCard(id: string) {
    if (!id) {
      throw new Error("Can't delete card");
    }

    await Card.deleteOne({ _id: id });
    await Card_Tag.deleteMany({ cardId: id });

    return id;
  }

  async createCard(ctx: Context) {
    const card: TCard = {
      _id: new mongoose.Types.ObjectId(),
      listId: ctx.request.body.listId,
      title: ctx.request.body.title,
      description: ctx.request.body.description || "",
    };

    await Card.create(card);

    return card;
  }
}
