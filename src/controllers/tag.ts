import { Context } from "koa";
import { TagService } from "../services/tag";


const tagService = new TagService();

export const CreateTag = async (ctx: Context) => {
  try {
    ctx.body = await tagService.createTag(ctx);
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};

export const deleteTag = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  try {
    ctx.body = tagService.deleteTag(id)
    ctx.status = 202;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const updateTag = async (ctx: Context) => {
  const id = ctx.url.split("/")[2];
  
  try {
    ctx.body = await tagService.updateTag(ctx, id);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};

export const getTags = async (ctx: Context) => {
  try {
    ctx.body = await tagService.getTags();
    ctx.status = 200;
  } catch (error) {
    ctx.status = 504;
    ctx.body = error;
  }
};
