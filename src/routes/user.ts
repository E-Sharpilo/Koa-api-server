import Router from "koa-router";
import { registration } from "../controllers/user";



const UserRouter = new Router()


UserRouter.post('/registration' ,registration);
UserRouter.post('/login');
UserRouter.post('/logout');
UserRouter.get('/refresh');

export default UserRouter

