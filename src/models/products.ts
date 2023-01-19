import client from '../database';




export type Product= {
    id: number,
    price: number,
    name: string,
    category: string,
}



export class ProductModel{
  
    // GET products
    async index(): Promise<Product[]>{
        try{
            const db= await client.connect();
            const query= 'select * from products';
            const rows= await db.query(query);

            // Close connection
            db.release()
            return rows.rows

        }catch(err){
                throw new Error(`Problem while getting all products, ${err}`);
            }
    }



     // GET products:id
     async show(id: number): Promise<Product>{
        try{
            const db= await client.connect();
            const query= 'select * from products where id= ($1);';
            const {rows}= await db.query(query, [id]);
            
            // Close connection
            db.release()
            return rows[0]

        }catch(err){
                throw new Error(`Problem while getting product with the id ${id}, ${err}`);
            }
    }



    // POST products
    async create(price: number, name: string, category: string): Promise<Product[]>{
        try{
            const db= await client.connect();
            const query= 'INSERT INTO products (price, name, category) VALUES($1, $2, $3)';
            const {rows}= await db.query(query, [price, name, category]);

            // Close connection
            db.release()
            return rows[0]

        }catch(err){
                throw new Error(`Problem while creating new product, ${err}`);
            }
    }





}