
import { Context } from "koa";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { TCard } from "../types/card";
import { List } from "../models/list";

export const addCard = async (ctx: Context) => {
  const card: TCard = {
    _id: new mongoose.Types.ObjectId(),
    title: ctx.request.body.title,
    description: ctx.request.body.description || '',
  }
  try {
    await List.updateOne({ _id: ctx.request.body.listId }, { $push: { cardsId: card._id } })
    await Card.create(card)
    ctx.body = card
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error
  }
}

export const deleteCard = async (ctx: Context) => {
  try {
    await List.updateOne({ _id: ctx.request.body.listId }, { $pull: { _id: ctx.request.body.cardId } })
    await Card.deleteOne({ _id: ctx.request.body.cardId })
    ctx.status = 202
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}

export const getCards = async (ctx: Context) => {
  try {
    ctx.body = await Card.find({ boardId: ctx.request.query.boardId })
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}


export const updateCard = async (ctx: Context) => {
  try {
    await Card.updateOne({ cardId: ctx.request.body.cardId }, { title: ctx.request.body.title, description: ctx.request.body.description})
    ctx.body = await Card.findOne({ cardId: ctx.request.body.cardId })
    ctx.status = 200
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}


