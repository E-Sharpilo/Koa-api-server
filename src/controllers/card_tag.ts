import { Context } from "koa";
import mongoose from "mongoose";
import { Card_Tag } from "../models/card_tag";
import { TCard_Tag } from "../types/card_tag";

export const addCardTag = async (ctx: Context) => {

  const card_tag: TCard_Tag = {
    _id: new mongoose.Types.ObjectId(),
    cardId: ctx.request.body.cardId,
    tagId: ctx.request.body.tagId
  }

  try {

    ctx.body = await Card_Tag.create(card_tag)
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error
  }
}

export const deleteCardTag = async (ctx: Context) => {
  try {
    await Card_Tag.deleteOne({ _id: ctx.request.body._id })
    ctx.status = 202
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}

export const getCardTags = async (ctx: Context) => {
  try {
    ctx.body = await Card_Tag.find({ cardId: ctx.request.query.cardId })
    ctx.status = 202
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}