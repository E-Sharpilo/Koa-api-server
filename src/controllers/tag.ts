import { Context } from "koa";
import mongoose from "mongoose";
import { Card } from "../models/card";
import { Tag } from "../models/tag";
import { TTag } from "../types/tag";

export const addTag = async (ctx: Context) => {
  const tag: TTag = {
    _id: new mongoose.Types.ObjectId(),
    boardId: ctx.request.body.boardId,
    title: ctx.request.body.title || '',
    color: ctx.request.body.color || ''
  }
  try {
    await Card.updateOne({ _id: ctx.request.body.cardId }, { $push: { tagsId: tag._id } })
    await Tag.create(tag)
    ctx.body = tag
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = error
  }
}

export const deleteTag = async (ctx: Context) => {
  try {
    await Card.updateOne({ _id: ctx.request.body.cardId }, { $pull: { tagsId: ctx.request.body.tagId } })
    await Tag.deleteOne({ _id: ctx.request.body.tagId })
    ctx.status = 202
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}

export const updateTag = async (ctx: Context) => {
  try {
    await Tag.updateOne({ _id: ctx.request.body.tagId }, { title: ctx.request.body.title, color: ctx.request.body.color })
    ctx.body = await Tag.findOne({ _id: ctx.request.body.tagId });
    ctx.status = 200
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}

export const getTags = async (ctx: Context) => {
  try {
    ctx.body = await Tag.find({ boardId: ctx.request.query.boardId })
    ctx.status = 200
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}