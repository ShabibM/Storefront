"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../models/products");
const productModel = new products_1.ProductModel();
const product = {
    id: 1,
    price: 100,
    name: 'Xbox',
    category: 'Games-Platform',
};
describe('Testing Products Model', () => {
    it('Checking create function', () => {
        expect(productModel.create).toBeDefined();
    });
    it('Checking index function', () => {
        expect(productModel.index).toBeDefined();
    });
    it('Checking show function, showing a product', async () => {
        const result_product = await productModel.show(product.id);
        expect(result_product.name).toEqual('Xbox');
    });
});
