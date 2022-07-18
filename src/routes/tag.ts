import Router from "koa-router";
import { CreateTag, deleteTag, getTags, updateTag } from "../controllers/tag";

export const TagsRout = new Router({
  prefix: '/tag'
})

TagsRout.post('/', CreateTag)
TagsRout.delete('/:id?', deleteTag)
TagsRout.patch('/:id?', updateTag)
TagsRout.get('/', getTags)