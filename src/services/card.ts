import { Context } from "koa";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { Card_Tag } from "../models/card_tag";
import { TCard } from "../types/card";

export class CardService {
  async getCards(listId: string[] | string) {
    const allCards = await Card.find({ listId: listId });

    if (!allCards) {
      throw new Error("Cards not found");
    }

    return allCards;
  }

  async getCardById(id: string) {
    const card = await Card.findOne({ _id: id });

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
    return await Card.findOne({ _id: id });
  }

  async deleteCard(id: string) {
    if (!id) {
      throw new Error("Can't delete card");
    }

    await Card.deleteOne({ _id: id });
    await Card_Tag.deleteMany({cardId: id})

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

    return card
  }
}
