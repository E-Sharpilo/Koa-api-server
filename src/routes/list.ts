import Router from "koa-router";
import { createList, deleteList, getLists, updateList } from "../controllers/list";

const ListsRout = new Router({
  prefix: '/list'
})

ListsRout.post('/', createList)
ListsRout.delete('/:id', deleteList)
ListsRout.patch('/:id', updateList)
ListsRout.get('/:id?', getLists)

export default ListsRout