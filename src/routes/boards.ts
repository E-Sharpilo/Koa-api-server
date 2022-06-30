import Router from "koa-router";
import { addBoard, deleteBoard, getAllBoards, getBoardWidthLists } from "../controllers/board";

export const BordersRout = new Router()


BordersRout.get('/', getAllBoards)
BordersRout.get('/:id', getBoardWidthLists)
BordersRout.post('/', addBoard)
BordersRout.delete('/', deleteBoard)
