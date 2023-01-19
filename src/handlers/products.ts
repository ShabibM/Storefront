import { ProductModel, Product } from '../models/products';
import { Application, Request, Response } from 'express';
import { verifyToken } from './utils';

// Contains DB SQL methods
const Products= new ProductModel();



const showAll=async (req: Request, res: Response) => {
    try {
        const products: Product[]= await Products.index() 
        res.send(products);
    } catch (err) {
        res.status(404).send(err)
    }
    
}


const show=async (req: Request, res: Response) => {
    try {
        const id= Number(req.params.id)
        if(id == undefined){
            return res.status(400).send('ID is missing.')
        }

        const products= await Products.show(id) 
        res.send(products);
    } catch (err) {
        res.status(404).send(err)
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        verifyToken(req);
        const { price, name, category } = req.body;
        if(Number.isNaN(price) || name == undefined || category == undefined){
            return res.status(403).send('Some parameters are missing.')
    }

      const product = await Products.create(price, name, category);
      res.send(product);
    } catch (err) {
    res.status(404).send(err)

    }
  };



const products_routes= (app: Application) =>{
    app.get('/products', showAll)
    app.get('/products/:id', show)
    app.post('/products', create)

  }


  export default products_routes;