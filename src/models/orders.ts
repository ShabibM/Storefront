import client from '../database';




export type Order= {
    id: number,
    user_id: number,
    status: string,
}

export type OrderDetails= {
    order_id: number,
    product_id: number,
    quantity: number,
}



export class OrderModel{
  
    // GET orders:id
    async index(id: Number): Promise<Order[]>{
        try{
            const db= await client.connect();
            const query= 'select * from orders where user_id= ($1);';
            const rows= await db.query(query, [id]);

            // Close connection
            db.release()
            return rows.rows

        }catch(err){
                throw new Error(`Problem while getting all orders of the user (${id}), ${err}`);
            }
    }








}