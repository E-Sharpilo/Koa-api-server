import Router from "koa-router";
import { addList, deleteList } from "../controllers/list";

export const ListsRout = new Router()

ListsRout.post('/:id', addList)
ListsRout.delete('/:id', deleteList)
