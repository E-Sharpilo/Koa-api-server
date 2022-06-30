
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
    Board.create(board, function (err) {
      if (err) {
        console.log(err);
      }
    });
    ctx.body = board
    ctx.status = 201;
  } catch {
    ctx.status = 504;
    ctx.body = 'cant create board, server error'
  }
}

export const getAllBoards = async (ctx: Context) => {
  try {
    ctx.status = 200;
    ctx.body = await Board.find({});
  } catch {
    ctx.status = 504;
    ctx.body = 'cant get boards, server error'
  }
}

export const getBoardWidthLists = async (ctx: Context) => {
  try {
    ctx.status = 200;
    ctx.body = await Board.find({ _id: ctx.params.id })
      .populate('listsId')
  } catch {
    ctx.status = 504;
    ctx.body = 'cant get boards, server error'
  }
}


export const deleteBoard = async (ctx: Context) => {
  try {
    ctx.body = await Board.deleteOne({ _id: ctx.request.body._id })
    ctx.status = 202
  } catch {
    ctx.status = 504
    ctx.body = 'cant delete board, server error'
  }
}
