import { Context } from "koa";
import mongoose from "mongoose";
import { Board } from "../models/board";
import { List } from "../models/list";
import { TList } from "../types/list";

export const addList = async (ctx: Context) => {
  const list: TList = {
    boardId: ctx.request.body.boardId,
    _id: new mongoose.Types.ObjectId(),
    title: ctx.request.body.title,
    cardsId: [],
  };

  try {
    await Board.updateOne(
      { _id: ctx.request.body.boardId },
      { $push: { listsId: list._id } }
    );
    await List.create(list);
    ctx.body = list;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const deleteList = async (ctx: Context) => {
  try {
    await Board.updateOne(
      { _id: ctx.request.body.boardId },
      { $pull: { listsId: ctx.request.body.listId } }
    );
    await List.deleteOne({ _id: ctx.request.body.listId });
    ctx.status = 202;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const updateList = async (ctx: Context) => {
  try {
    await List.updateOne(
      { _id: ctx.request.body.listId },
      { title: ctx.request.body.title }
    );
    ctx.body = await List.findOne({ _id: ctx.request.body.listId });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const getLists = async (ctx: Context) => {
  try {
    ctx.body = await List.find({ boardId: ctx.url.split("/")[2] }).populate(
      "cardsId"
    );
    ctx.status = 200;
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};
