"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const utils_1 = require("./utils");
// Contains DB SQL methods
const Products = new products_1.ProductModel();
const showAll = async (req, res) => {
    try {
        const products = await Products.index();
        res.send(products);
    }
    catch (err) {
        res.status(404).send(err);
    }
};
const show = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (id == undefined) {
            return res.status(400).send('ID is missing.');
        }
        const products = await Products.show(id);
        res.send(products);
    }
    catch (err) {
        res.status(404).send(err);
    }
};
const create = async (req, res) => {
    try {
        (0, utils_1.verifyToken)(req);
        const { price, name, category } = req.body;
        if (Number.isNaN(price) || name == undefined || category == undefined) {
            return res.status(400).send('Some parameters are missing.');
        }
        const product = await Products.create(price, name, category);
        res.send(product);
    }
    catch (err) {
        res.status(404).send(err);
    }
};
const products_routes = (app) => {
    app.get('/products', showAll);
    app.get('/products/:id', show);
    app.post('/products', create);
};
exports.default = products_routes;
