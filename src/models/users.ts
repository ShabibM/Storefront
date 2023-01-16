import client from '../database';
import bcrypt from 'bcrypt'

const bcrypt_password= process.env.BCRYPT_PASSWORD;
const salt= process.env.SALT_ROUNDS


export type User= {
    id: number,
    firstname: string,
    lastname: string,
    password: string,
    email: string
}



export class UserModel{


    // GET users
    async index(): Promise<User[]>{
        try{
            const db= await client.connect();
            const query= 'select * from users';
            const rows= await db.query(query);

            // Close connection
            db.release()
            return rows.rows

        }catch(err){
                throw err;
            }
    }

    // GET users:id
    async show(id: number): Promise<User> {
        try {
            const db= await client.connect();
            const query= 'select * from users where id == $1';
            const rows= await db.query(query, [id]);
          db.release();
          return rows.rows[0];
        } catch (err) {
          throw  err
        }
      }


    //   POST users
      async create(firstname: string, lastname: string, password: string, email: string ): Promise<User> {
        try {
            const db= await client.connect();
            const query= 'INSERT INTO users (firstname, lastname, password, email) VALUES($1, $2, $3)';
            
            // Encrypt the entered password using 5 rounds of salting
            const hash_result= bcrypt.hashSync(password+ bcrypt_password, parseInt(salt as string))
            const rows= await db.query(query, [firstname, lastname, hash_result, email]);
            db.release();
            return rows.rows[0];
        } catch (err) {
          throw  err;
        }
      }

      /**
       * we can use something else for auth for ex (username or email)
       */

      //   POST /users/login (Authentication)
      async auth(email: string, password: string ): Promise<User | string> {
        try {
            const db= await client.connect();
            const query= 'select * from users where email== ($1)';
            const {rows}= await db.query(query, [email]);
            
            if(rows.length != 0){
                const saved_password= rows[0].password

                if(bcrypt.compareSync(password+bcrypt_password, saved_password)){
                    return rows[0]
                }
            }
            db.release();

            // password does not match
            return '401';
        } catch (err) {
            console.log("User not found.")
          throw  err;
        }
      }

}
