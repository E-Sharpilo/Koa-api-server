import { Context } from "koa";
import { BoardService } from "../services/board";

const boardService = new BoardService()

export const createBoard = async (ctx: Context) => {
  try {
    ctx.body = await boardService.createBoard(ctx);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const getBoards = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  try {
    if (id) {
      ctx.body = await boardService.getBoardById(id);
      ctx.status = 200;
    } else {
      ctx.body = await boardService.getBoards();
      ctx.status = 200;
    }
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};

export const deleteBoard = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];

  try {
    ctx.body = await boardService.deleteBoard(id)
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const updateBoard = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  try {
    ctx.body = await boardService.updateBoard(ctx, id);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};
