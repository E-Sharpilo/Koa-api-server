import Router from "koa-router";
import { createList, deleteList, getLists, updateList } from "../controllers/list";
import { authorization } from "../middleware/authorization";

const ListsRout = new Router({
  prefix: '/list'
})

ListsRout.post('/', authorization, createList)
ListsRout.delete('/:id', authorization, deleteList)
ListsRout.patch('/:id', authorization, updateList)
ListsRout.get('/:id?', authorization, getLists)

export default ListsRout