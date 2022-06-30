
import { Context } from "koa";
import mongoose from "mongoose";

import { Board } from '../models/board';
import { TBoard } from "../types/board";




export const addBoard = async (ctx: Context) => {
  const board: TBoard = {
    _id: new mongoose.Types.ObjectId(),
    title: ctx.request.body.title,
    listsId: []
  }

  try {
    Board.create(board);
    ctx.body = board
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error
  }
}

export const getBoards = async (ctx: Context) => {
  try {
    ctx.status = 200;
    ctx.body = await Board.find({});
  } catch (error) {
    ctx.status = 404;
    ctx.body = error
  }
}

export const deleteBoard = async (ctx: Context) => {
  try {
    ctx.body = await Board.deleteOne({ _id: ctx.request.body.boardId })
    ctx.status = 200
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}

export const updateBoard = async (ctx: Context) => {
  try {
    await Board.updateOne({ _id: ctx.request.body.boardId }, { title: ctx.request.body.title })
    ctx.body = await Board.findOne({ _id: ctx.request.body.boardId });
    ctx.status = 200
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}
