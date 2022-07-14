import Router from "koa-router";
import { createCard, deleteCard, getCards, updateCard } from "../controllers/card";

export const CardsRout = new Router({
  prefix: '/card'
})

CardsRout.post('/', createCard)
CardsRout.get('/:id?', getCards)
CardsRout.delete('/:id?', deleteCard)
CardsRout.patch('/:id?', updateCard)
