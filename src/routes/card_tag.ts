import Router from "koa-router";
import { addCardTag, deleteCardTag, getCardTags } from "../controllers/card_tag";
import { authorization } from "../middleware/authorization";


const CardTagRout = new Router({
  prefix: '/card-tag'
})

CardTagRout.post('/', authorization, addCardTag)
CardTagRout.delete('/:id?', authorization, deleteCardTag)
CardTagRout.get('/', authorization, getCardTags)

export default CardTagRout

