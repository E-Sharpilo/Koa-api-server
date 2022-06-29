import 'dotenv/config'


const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@primaryclaster.15fxhao.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3000

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: PORT
  }
}
