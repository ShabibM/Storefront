import dotenv from 'dotenv'
import {Pool} from 'pg'


dotenv.config()


const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_TEST_DB, ENV } =
  process.env; // Destructuring the process.env object


//   pool --> postgres method to connect to the DB
const client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === 'TEST' ? POSTGRES_TEST_DB :POSTGRES_DB,
});

export default client;