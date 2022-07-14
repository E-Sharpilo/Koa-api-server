import { Context } from "koa";
import mongoose from "mongoose";
import { Card_Tag } from "../models/card_tag";
import { Tag } from "../models/tag";
import { TCard_Tag } from "../types/card_tag";
import { TTag } from "../types/tag";
 

export const addTag = async (ctx: Context) => {
  const tag: TTag = {
    _id: new mongoose.Types.ObjectId(),
    title: ctx.request.body.title || '',
    color: ctx.request.body.color || ''
  }

  const card_tag: TCard_Tag = {
    _id: new mongoose.Types.ObjectId(),
    cardId: ctx.request.body.cardId,
    tagId: tag._id
  }

  try {
    await Card_Tag.create(card_tag)
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
    await Tag.deleteOne({ _id: ctx.request.body.tagId })
    await Card_Tag.deleteMany({tagId:ctx.request.body.tagId})
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
    ctx.body = await Tag.find({})
    ctx.status = 200
  } catch (error) {
    ctx.status = 504
    ctx.body = error
  }
}