import Router from "koa-router";
import { createBoard, deleteBoard, getBoards, updateBoard} from "../controllers/board";

const BordersRout = new Router({
  prefix: '/board'
})


BordersRout.get('/:id?', getBoards)
BordersRout.post('/', createBoard)
BordersRout.delete('/:id', deleteBoard)
BordersRout.patch('/:id', updateBoard)


export default BordersRout
