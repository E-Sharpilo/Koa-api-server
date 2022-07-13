import Router from "koa-router";
import { addList, deleteList, getLists, updateList } from "../controllers/list";

export const ListsRout = new Router({
  prefix: '/list'
})

ListsRout.post('/', addList)
ListsRout.delete('/', deleteList)
ListsRout.patch('/', updateList)
ListsRout.get('/:id?', getLists)
