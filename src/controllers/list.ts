import { Context } from "koa";
import mongoose from "mongoose";
import { Board } from '../models/board';
import { List } from "../models/list";
import { TList } from "../types/list";

export const addList = async (ctx: Context) => {

  const list: TList = {
    _id: new mongoose.Types.ObjectId(),
    title: ctx.request.body.title,
    cardsId: []
  }

  try {
    List.create(list, function (err) {
      if (err) {
        console.log(err);
      }
    })

    await Board.updateOne({ _id: ctx.params.id }, { $push: { listsId: list._id } })
    ctx.body = list
    ctx.status = 201;
  } catch {
    ctx.status = 504;
    ctx.body = 'cant create list, server error'
  }
}

