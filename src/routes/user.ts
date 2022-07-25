import Router from "koa-router";
import { login, logout, refresh, registration } from "../controllers/user";



const UserRouter = new Router()


UserRouter.post('/registration' ,registration);
UserRouter.post('/login', login);
UserRouter.post('/logout', logout);
UserRouter.get('/refresh', refresh);

export default UserRouter

