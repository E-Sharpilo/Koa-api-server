import { Context } from "koa";
import mongoose from "mongoose";

import { Board } from "../models/board";
import { Card } from "../models/card";
import { List } from "../models/list";
import { TBoard } from "../types/board";

export const addBoard = async (ctx: Context) => {
  const board: TBoard = {
    _id: new mongoose.Types.ObjectId(),
    color: ctx.request.body.color,
    title: ctx.request.body.title.trim()
  };

  try {
    Board.create(board);
    ctx.body = board;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const getBoards = async (ctx: Context) => {
  try {
    if (ctx.url.split("/")[2]) {
      ctx.body = await Board.findOne({ _id: ctx.url.split("/")[2] });
      ctx.status = 200;
    } else {
      ctx.status = 200;
      ctx.body = await Board.find({});
    }
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};

export const deleteBoard = async (ctx: Context) => {
  try {
    ctx.body = await Board.deleteOne({ _id: ctx.url.split("/")[2] });
    await List.deleteMany({boardId: ctx.url.split("/")[2]})
    await Card.deleteMany({boardId: ctx.url.split("/")[2]})
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const updateBoard = async (ctx: Context) => {
  console.log('board update');
  
  try {
    await Board.updateOne(
      { _id: ctx.url.split("/")[2] },
      { title: ctx.request.body.title.trim() }
    );
    ctx.body = await Board.findOne({ _id: ctx.url.split("/")[2] });
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};
