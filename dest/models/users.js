"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_password = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;
class UserModel {
    // GET users
    async index() {
        try {
            const db = await database_1.default.connect();
            const query = 'select * from users';
            const rows = await db.query(query);
            // Close connection
            db.release();
            return rows.rows;
        }
        catch (err) {
            throw err;
        }
    }
    // GET users:id
    async show(id) {
        try {
            const db = await database_1.default.connect();
            const query = 'select * from users where id = ($1)';
            const rows = await db.query(query, [id]);
            db.release();
            return rows.rows[0];
        }
        catch (err) {
            throw err;
        }
    }
    //   POST users
    async create(firstname, lastname, password, email) {
        try {
            const db = await database_1.default.connect();
            const query = 'INSERT INTO users (firstname, lastname, password, email) VALUES($1, $2, $3, $4)';
            // Encrypt the entered password using 5 rounds of salting
            const hash_result = bcrypt_1.default.hashSync(password + bcrypt_password, parseInt(salt));
            const { rows } = await db.query(query, [firstname, lastname, hash_result, email]);
            db.release();
            return rows[0];
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * we can use something else for auth for ex (username or email)
     */
    //   POST /users/login (Authentication)
    async auth(email, password) {
        try {
            const db = await database_1.default.connect();
            const query = 'select * from users where email= ($1::text)';
            const { rows } = await db.query(query, [email]);
            if (rows.length != 0) {
                const saved_password = rows[0].password;
                // Decode the entered password to match the stored password (hashed !)
                if (bcrypt_1.default.compareSync(password + bcrypt_password, saved_password)) {
                    return rows[0];
                }
            }
            await db.release();
            // password does not match
            return null;
        }
        catch (err) {
            console.log("User not found.");
            throw err;
        }
    }
}
exports.UserModel = UserModel;
