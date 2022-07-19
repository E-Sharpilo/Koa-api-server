import { Context } from "koa";
import mongoose from "mongoose";
import { Card_Tag } from "../models/card_tag";
import { TCard_Tag } from "../types/card_tag";

export class CardTagsService {
  async getCardTags(ctx: Context) {
    return await Card_Tag.find({ cardId: ctx.query.cardId });
  }

  async deleteCardTags(id: string) {
    await Card_Tag.deleteOne({ _id: id })
    return id
  }

  async crateCardTag(ctx: Context) {
    const card_tag: TCard_Tag = {
      _id: new mongoose.Types.ObjectId(),
      cardId: ctx.request.body.cardId,
      tagId: ctx.request.body.tagId
    }
    await Card_Tag.create(card_tag)
    return card_tag
  }
}
