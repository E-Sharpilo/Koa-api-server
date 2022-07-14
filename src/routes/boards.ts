import Router from "koa-router";
import { createBoard, deleteBoard, getBoards, updateBoard} from "../controllers/board";

export const BordersRout = new Router({
  prefix: '/board'
})


BordersRout.get('/:id?', getBoards)
BordersRout.post('/', createBoard)
BordersRout.delete('/:id', deleteBoard)
BordersRout.patch('/:id', updateBoard)

