import { Order, OrderModel } from '../../models/orders';

const orderModel= new OrderModel();


        const order: Order= {
        id: 1,
        user_id: 2,
        status: "transit"
    };

describe('Testing Orders Model', () => {

  beforeAll(async () => {
    process.env.ENV= 'TEST'

})
  

    it('Checking index function', () => {
      expect(orderModel.index).toBeDefined();
    });

   
    it('Checking index function, showing a particular user orders', async () => {
        const result= await orderModel.index(order.user_id);
        expect(result[0].status).toEqual('shipped');
      });


})