"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    // GET orders:id
    async index(id) {
        try {
            const db = await database_1.default.connect();
            const query = 'select * from orders where id= ($1);';
            const rows = await db.query(query, [id]);
            // Close connection
            db.release();
            return rows.rows;
        }
        catch (err) {
            throw new Error(`Problem while getting all orders of the user (${id}), ${err}`);
        }
    }
}
exports.OrderModel = OrderModel;
