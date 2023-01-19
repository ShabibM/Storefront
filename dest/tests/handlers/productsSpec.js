"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const req = (0, supertest_1.default)(server_1.default);
describe('Testing Product handlers ', () => {
    // to intiate a token
    const user = {
        id: 2,
        firstname: 'Shabibz',
        lastname: 'Dos',
        password: 'xxx',
        email: '1234@gmail.com'
    };
    const product = {
        id: 2,
        price: 99,
        name: 'PS5',
        category: 'Games-Platform',
    };
    // To assgin a new token
    let secrect_token;
    beforeAll(async () => {
        await req
            .post('/users/login')
            .send({
            email: "1234@gmail.com",
            password: 'xxx'
        })
            .then((res) => {
            secrect_token = res.body.token;
            //  console.log('SpectTest',secrect_token)
        });
    });
    it('Endpoint [Index] product', async () => {
        const res = await req
            .get('/products');
        expect(res.status).toBe(200);
    });
    it('Endpoint [show] product', async () => {
        const res = await req
            .get('/products/1');
        expect(res.status).toBe(200);
    });
    it('Endpoint [CREATE] product with VALID token', async () => {
        const res = await req
            .post('/products')
            .send(product)
            .set('Authorization', `Bearer ${secrect_token}`);
        expect(res.status).toBe(200);
    });
    it('Endpoint [CREATE] product with INVALID token', async () => {
        const res = await req
            .post('/products')
            .send(product)
            .set('Authorization', `Bearer JWTtokenNotSecrect`);
        expect(res.status).toBe(404);
    });
});
