import Router from "koa-router";
import { addCardTag, deleteCardTag, getCardTags } from "../controllers/card_tag";


export const CardTagRout = new Router({
  prefix: '/card-tag'
})

CardTagRout.post('/', addCardTag)
CardTagRout.delete('/', deleteCardTag)
CardTagRout.get('/', getCardTags)

