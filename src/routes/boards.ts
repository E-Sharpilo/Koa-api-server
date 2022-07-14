import Router from "koa-router";
import { addBoard, deleteBoard, getBoards, updateBoard} from "../controllers/board";

export const BordersRout = new Router({
  prefix: '/board'
})


BordersRout.get('/:id?', getBoards)
BordersRout.post('/', addBoard)
BordersRout.delete('/:id', deleteBoard)
BordersRout.patch('/:id', updateBoard)

