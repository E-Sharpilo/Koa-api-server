import combineRouters from 'koa-combine-routers'

import BoardsRouter from './boards'
import CardsRout from './card'
import CardTagRout from './card_tag'
import ListRouter from './list'
import TagsRout from './tag'
import UserRouter from './user'


const router = combineRouters(
  BoardsRouter,
  ListRouter,
  TagsRout,
  CardsRout,
  CardTagRout,
  UserRouter
)

export default router