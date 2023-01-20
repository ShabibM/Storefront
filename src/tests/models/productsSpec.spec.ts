import { Product, ProductModel } from '../../models/products';

const productModel= new ProductModel();


        const product: Product= {
        id: 1,
        price: 100,
        name: 'Xbox',
        category: 'Games-Platform',
    };

describe('Testing Products Model', () => {


  beforeAll(async () => {
    process.env.ENV= 'TEST'

})

    it('Checking create function', () => {
      expect(productModel.create).toBeDefined();
    });

    it('Checking index function', () => {
        expect(productModel.index).toBeDefined();
    });
   
    it('Checking show function, showing a product', async () => {
        const result_product= await productModel.show(product.id);
        expect(result_product.name).toEqual('Xbox');
      });



    

})