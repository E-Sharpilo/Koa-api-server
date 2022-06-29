import Router from "koa-router";
import { addBoard, deleteBoard, getAllBoards, getBoard } from "../controllers/board";

export const BordersRout = new Router()


BordersRout.get('/', getAllBoards)
BordersRout.get('/:id', getBoard)
BordersRout.post('/', addBoard)
BordersRout.delete('/', deleteBoard)
