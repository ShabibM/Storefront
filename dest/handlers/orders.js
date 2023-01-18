"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const utils_1 = require("./utils");
// Contains DB SQL methods
const Orders = new orders_1.OrderModel();
const showAll = async (req, res) => {
    try {
        (0, utils_1.verifyToken)(req);
        const id = Number(req.params.id);
        if (id == undefined) {
            return res.status(400).send('ID is missing.');
        }
        const orders = await Orders.index(id);
        res.send(orders);
    }
    catch (err) {
        res.status(404).send(err);
    }
};
const orders_routes = (app) => {
    app.get('/orders:id', showAll);
};
exports.default = orders_routes;
