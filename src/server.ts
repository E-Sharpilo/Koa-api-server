import Koa from 'koa';
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser';
import { config } from './config/config';
import mongoose from 'mongoose';
import { BordersRout } from './routes/boards'
import { ListsRout } from './routes/list';
import { CardsRout } from './routes/card';
import { TagsRout } from './routes/tag';
import { CardTagRout } from './routes/card_tag';

const PORT = config.server.port

const server: Koa = new Koa()

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('connected to MONGO_DB');
    start()
  })
  .catch((error) => {
    console.log('unable to connect', error);
  })


const start = () => {
  try{
    server.use(cors())
    server.use(bodyParser())
  
    server.use(BordersRout.routes())
      .use(ListsRout.routes())
      .use(CardsRout.routes())
      .use(TagsRout.routes())
      .use(CardTagRout.routes())

    server.listen(PORT).on('listening', () => (
      console.log(`sever listening ${PORT} port, go to http://localhost:${PORT}`)
    ))
  }catch {
    console.log(new Error);
  }
}
