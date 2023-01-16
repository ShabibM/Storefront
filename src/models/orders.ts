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

