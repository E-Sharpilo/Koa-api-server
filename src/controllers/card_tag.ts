import { Context } from "koa";
import { CardTagsService } from "../services/card_tags";


const cardTagsService = new CardTagsService()

export const addCardTag = async (ctx: Context) => {
  try {
    ctx.body = await cardTagsService.crateCardTag(ctx);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
}

export const deleteCardTag = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  try {
    ctx.body = await cardTagsService.deleteCardTags(id);
    ctx.status = 202
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}

export const getCardTags = async (ctx: Context) => {
  try {
    ctx.body = await cardTagsService.getCardTags(ctx);
    ctx.status = 202
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}