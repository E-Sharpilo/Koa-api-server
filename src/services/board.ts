import { Context } from "koa";
import mongoose from "mongoose";
import { Board } from "../models/board";
import { List } from "../models/list";
import { TBoard } from "../types/board";
import { ListService } from "./list";

const listService = new ListService()

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

  async deleteBoard(id: string) {
    if (!id) {
      throw new Error("Can't delete board");
    } 

    await Board.deleteOne({ _id: id });
    const listsId = await List.find({ boardId: id }, { _id: true });
    listsId.forEach(async list => {
      await listService.deleteList(list._id.toString())
    })

    return id;
  }
}
