import Koa from 'koa';
import Router from 'koa-router';
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa';
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser';
import { config } from './config/config';
import 'dotenv/config'
import mongoose from 'mongoose';

const PORT = config.server.port

const server: Koa<DefaultState, DefaultContext> = new Koa()
const router: Router = new Router()


mongoose
  .connect(config.mongo.url, {retryWrites: true, w: 'majority'})
  .then(() => {
    console.log('connected to MONGO_DB');
  })
  .catch((error) => {
    console.log(error);
    
  })


server.use(cors())
server.use(bodyParser())

router.get('/', async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
  ctx.body = { msg: 'Hello' }
})


server.use(router.routes()).use(router.allowedMethods())


server.listen(PORT).on('listening', () => (
  console.log(`sever listening ${PORT} port, go to http://localhost:${PORT}`)
))