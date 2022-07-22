import Router from "koa-router";
import { addCardTag, deleteCardTag, getCardTags } from "../controllers/card_tag";


const CardTagRout = new Router({
  prefix: '/card-tag'
})

CardTagRout.post('/', addCardTag)
CardTagRout.delete('/:id?', deleteCardTag)
CardTagRout.get('/', getCardTags)

export default CardTagRout

