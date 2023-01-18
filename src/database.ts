import dotenv from 'dotenv'
import {Pool} from 'pg'


dotenv.config()


const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env; // Destructuring the process.env object


//   pool --> postgres method to connect to the DB
const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});

export default client;