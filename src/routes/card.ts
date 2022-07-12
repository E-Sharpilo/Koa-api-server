import Router from "koa-router";
import { addCard, deleteCard, getCards, updateCard } from "../controllers/card";

export const CardsRout = new Router({
  prefix: '/card'
})

CardsRout.post('/', addCard)
CardsRout.get('/:id?', getCards)
CardsRout.delete('/', deleteCard)
CardsRout.patch('/', updateCard)
