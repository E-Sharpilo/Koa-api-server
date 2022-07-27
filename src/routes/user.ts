import Router from "koa-router";
import { getUser, login, logout, refresh, registration } from "../controllers/user";
import { authorization } from "../middleware/authorization";



const UserRouter = new Router()


UserRouter.post('/registration' ,registration);
UserRouter.post('/login', login);
UserRouter.get('/logout', logout);
UserRouter.get('/refresh', refresh);
UserRouter.get('/user', authorization, getUser)

export default UserRouter

