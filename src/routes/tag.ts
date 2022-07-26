import Router from "koa-router";
import { CreateTag, deleteTag, getTags, updateTag } from "../controllers/tag";
import { authorization } from "../middleware/authorization";

const TagsRout = new Router({
  prefix: '/tag'
})

TagsRout.post('/', authorization, CreateTag)
TagsRout.delete('/:id?', authorization, deleteTag)
TagsRout.patch('/:id?', authorization, updateTag)
TagsRout.get('/', authorization, getTags)


export default TagsRout