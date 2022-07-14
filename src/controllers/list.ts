import { Context } from "koa";
import { ListService } from "../services/list";

const listService = new ListService()

export const createList = async (ctx: Context) => {
  try {
    ctx.body = await listService.createList(ctx);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const deleteList = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  
  try {
    ctx.body = await listService.deleteList(id)
    ctx.status = 202;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const updateList = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  
  try {
    ctx.body = await listService.updateList(ctx, id);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const getLists = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  const boardId = ctx.query.boardId;
  try {
    if(boardId) {
      ctx.body = await listService.getLists(boardId);
      ctx.status = 200;
    }

    if(id) {
      ctx.body = await listService.getListById(id);
      ctx.status = 200;
    }

  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};
