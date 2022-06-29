import Router from "koa-router";
import { addList } from "../controllers/list";

export const ListsRout = new Router()

ListsRout.post('/:id', addList)