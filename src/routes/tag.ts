import Router from "koa-router";
import { addTag, deleteTag, getTags, updateTag } from "../controllers/tag";

export const TagsRout = new Router({
  prefix: '/tag'
})

TagsRout.post('/', addTag)
TagsRout.delete('/', deleteTag)
TagsRout.patch('/', updateTag)
TagsRout.get('/', getTags)