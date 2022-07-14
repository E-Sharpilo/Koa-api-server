import { Context } from "koa";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { List } from "../models/list";
import { TList } from "../types/list";
import { CardService } from "./card";

const cardService = new CardService();

export class ListService {
  async getLists(id: string) {
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
      title: ctx.request.body.title,
    };

    await List.create(list);

    return list;
  }

  async updateList(ctx: Context, id: string) {
    await List.updateOne({ _id: id }, { title: ctx.request.body.title.trim() });
    const list = await List.findOne({ _id: id });

    if (!list) {
      throw new Error("Board not found");
    }

    return list;
  }

  async deleteList(id: string) {
    if (id) {
      const cardsId = await Card.find({ listId: id }, { _id: true });

      cardsId.forEach(async (card) => {
        await cardService.deleteCard(card._id.toString())
      });

      await List.deleteOne({ _id: id });
    }

    return id;
  }
}
