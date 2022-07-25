import Koa from 'koa';
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser';
import { config } from './config/config';
import mongoose from 'mongoose';
import cookie from 'koa-cookie';
import router from './routes';

const PORT = config.server.port

const server: Koa = new Koa()

server.use(cors(
  {
    credentials: true
  }
))
server.use(bodyParser())
server.use(cookie())
server.use(router())

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('connected to MONGO_DB');
    start()
  })
  .catch((error) => {
    console.log('unable to connect', error);
  })


const start = async () => {
  try{
    server.listen(PORT).on('listening', () => (
      console.log(`sever listening ${PORT} port, go to http://localhost:${PORT}`)
    ))
  }catch {
    console.log(new Error);
  }
}
