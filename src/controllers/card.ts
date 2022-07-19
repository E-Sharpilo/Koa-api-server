import { Context } from "koa";
import { CardService } from "../services/card";

const cardService = new CardService();

export const createCard = async (ctx: Context) => {
  try {
    ctx.body = await cardService.createCard(ctx);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const deleteCard = async (ctx: Context) => {
  const id = ctx.url.split("/")[2]
  try {
    ctx.body = await cardService.deleteCard(id);
    ctx.status = 202;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const getCards = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  const listId = ctx.query.listId;
  try {
    if (id) {
      ctx.body = await cardService.getCardById(id);
      ctx.status = 200;
    }

    if (listId) {
      ctx.status = 200;
      ctx.body = await cardService.getCards(listId);
    }
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};

export const updateCard = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  try {
    if (id) {
      ctx.body = await cardService.updateCard(id, ctx);
      ctx.status = 200;
    }
  } catch (error) {
    ctx.status = 404;
    ctx.body = error;
  }
};
