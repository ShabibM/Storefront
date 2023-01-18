"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    // GET products
    async index() {
        try {
            const db = await database_1.default.connect();
            const query = 'select * from products';
            const rows = await db.query(query);
            // Close connection
            db.release();
            return rows.rows;
        }
        catch (err) {
            throw new Error(`Problem while getting all products, ${err}`);
        }
    }
    // GET products:id
    async show(id) {
        try {
            const db = await database_1.default.connect();
            const query = 'select * from products where id== ($1)';
            const { rows } = await db.query(query, [id]);
            // Close connection
            db.release();
            return rows[0];
        }
        catch (err) {
            throw new Error(`Problem while getting product with the id ${id}, ${err}`);
        }
    }
    // POST products
    async create(price, name, category) {
        try {
            const db = await database_1.default.connect();
            const query = 'INSERT INTO products (price, name, category) VALUES($1, $2, $3)';
            const { rows } = await db.query(query, [price, name, category]);
            // Close connection
            db.release();
            return rows[0];
        }
        catch (err) {
            throw new Error(`Problem while creating new product, ${err}`);
        }
    }
}
exports.ProductModel = ProductModel;
