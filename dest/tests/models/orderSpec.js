"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const orderModel = new orders_1.OrderModel();
const order = {
    id: 1,
    user_id: 2,
    status: "transit"
};
describe('Testing Orders Model', () => {
    it('Checking index function', () => {
        expect(orderModel.index).toBeDefined();
    });
    it('Checking index function, showing a particular user orders', async () => {
        const result = await orderModel.index(order.user_id);
        expect(result[0].status).toEqual('shipped');
    });
});
