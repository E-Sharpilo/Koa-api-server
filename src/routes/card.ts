import Router from "koa-router";
import { createCard, deleteCard, getCards, updateCard } from "../controllers/card";
import { authorization } from "../middleware/authorization";

const CardsRout = new Router({
  prefix: '/card'
})

CardsRout.post('/', authorization, createCard)
CardsRout.get('/:id?', authorization, getCards)
CardsRout.delete('/:id?', authorization, deleteCard)
CardsRout.patch('/:id?', authorization, updateCard)


export default CardsRout