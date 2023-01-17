import { Order, OrderModel } from '../models/orders';
import { Application, Request, Response } from 'express';
import { verifyToken } from './utils';

// Contains DB SQL methods
const Orders= new OrderModel();



const showAll=async (req: Request, res: Response) => {
    try {
        verifyToken(req);
        const id= Number(req.params.id)
        if(id == undefined){
            return res.status(400).send('ID is missing.')
        }

        const orders= await Orders.index(id) 
        res.send(orders);
    } catch (err) {
        res.status(404).send(err)
    }
    
}



const orders_routes= (app: Application) =>{
    app.get('/orders:id', showAll)

  }


  export default orders_routes;