import { Context } from "koa";
import mongoose from "mongoose";
import { Board } from "../models/board";
import { Card } from "../models/card";
import { List } from "../models/list";
import { TBoard } from "../types/board";

export class BoardService {
  async getBoards() {
    const allBoards = await Board.find({});

    if (!allBoards) {
      throw new Error("Boards not found");
    }

    return allBoards;
  }

  async getBoardById(id: string) {
    const board = await Board.findOne({ _id: id });

    if (!board) {
      throw new Error("Board not found");
    }

    return board;
  }

  async createBoard(ctx: Context) {
    const board: TBoard = {
      _id: new mongoose.Types.ObjectId(),
      color: ctx.request.body.color,
      title: ctx.request.body.title.trim(),
    };

    await Board.create(board);
    return board;
  }

  async updateBoard(ctx: Context, id: string) {
    await Board.updateOne(
      { _id: id },
      { title: ctx.request.body.title.trim() }
    );
    const board = await Board.findOne({ _id: id });

    if (!board) {
      throw new Error("Board not found");
    }

    return board;
  }

  async deleteBoard(ctx: Context) {
    const id = ctx.url.split("/")[2];

    if (id) {
      await Board.deleteOne({ _id: id });
      const listsId = await List.find({ boardId: id }, { _id: true });
      listsId.forEach(async list => {
        const cardsId = await Card.find({listId: list._id}, { _id: true })
        cardsId.forEach(async card => {
          await Card.deleteOne({_id: card._id})
        });

        await List.deleteOne({_id: list._id})
      })
    }

    return id;
  }
}
