import { Context } from "koa";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { TCard } from "../types/card";
import { List } from "../models/list";

export const addCard = async (ctx: Context) => {
  const card: TCard = {
    _id: new mongoose.Types.ObjectId(),
    listId: ctx.request.body.listId,
    title: ctx.request.body.title,
    description: ctx.request.body.description || "",
  };
  try {
    await Card.create(card);
    ctx.body = card;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const deleteCard = async (ctx: Context) => {
  try {
    await List.updateOne(
      { _id: ctx.request.body.listId },
      { $pull: { _id: ctx.request.body.cardId } }
    );
    await Card.deleteOne({ _id: ctx.request.body.cardId });
    ctx.status = 202;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const getCards = async (ctx: Context) => {
  try {
    if (ctx.url.split("/")[2]) {
      ctx.body = await Card.findOne({ _id: ctx.url.split("/")[2] });
      ctx.status = 200;
    } else {
      ctx.status = 200;
      ctx.body = await Card.find({ listId: ctx.query.listId });
    }
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};

export const updateCard = async (ctx: Context) => {
  try {
    await Card.updateOne(
      { cardId: ctx.request.body.cardId },
      {
        title: ctx.request.body.title,
        description: ctx.request.body.description,
      }
    );
    ctx.body = await Card.findOne({ cardId: ctx.request.body.cardId });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};
