import { Context } from "koa";
import mongoose from "mongoose";
import { Card_Tag } from "../models/card_tag";
import { Tag } from "../models/tag";
import { TCard_Tag } from "../types/card_tag";
import { TTag } from "../types/tag";

export class TagService {
  async getTags() {
    return await Tag.find({});
  }

  async updateTag(ctx: Context, id: string) {
    await Tag.updateOne(
      { _id: id },
      { title: ctx.request.body.title.trim(), color: ctx.request.body.color }
    );
    const tag = await Tag.findOne({ _id: id });

    if (!tag) {
      throw new Error("tag not found");
    }

    return tag
  }

  async deleteTag(id: string) {
    await Tag.deleteOne({ _id: id });
    await Card_Tag.deleteMany({ tagId: id });

    return id
  }

  async createTag(ctx: Context) {
    const tag: TTag = {
      _id: new mongoose.Types.ObjectId(),
      title: ctx.request.body.title || "",
      color: ctx.request.body.color || "",
    };

    const card_tag: TCard_Tag = {
      _id: new mongoose.Types.ObjectId(),
      cardId: ctx.request.body.cardId,
      tagId: tag._id,
    };

    await Card_Tag.create(card_tag);
    await Tag.create(tag);

    return tag
  }
}
