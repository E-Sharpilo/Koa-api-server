import { Context } from "koa";
import mongoose from "mongoose";
import { List } from "../models/list";
import { TList } from "../types/list";

export class ListService {
  async getLists(ctx: Context) {
    const id = ctx.url.split("/")[2];
    const lists = await List.find({ boardId: id });

    if (!lists) {
      throw new Error("Lists not found");
    }

    return lists;
  }

  async createList(ctx: Context) {
    const list: TList = {
      boardId: ctx.request.body.boardId,
      _id: new mongoose.Types.ObjectId(),
      title: ctx.request.body.title
    };

    await List.create(list);

    return list
  }
}
