import Router from "koa-router";
import { createBoard, deleteBoard, getBoards, updateBoard} from "../controllers/board";
import { authorization } from "../middleware/authorization";

const BordersRout = new Router({
  prefix: '/board'
})


BordersRout.get('/:id?',authorization, getBoards)
BordersRout.post('/',authorization, createBoard)
BordersRout.delete('/:id',authorization, deleteBoard)
BordersRout.patch('/:id',authorization, updateBoard)


export default BordersRout
