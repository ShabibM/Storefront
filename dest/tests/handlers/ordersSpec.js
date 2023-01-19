"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
// import { orders } from '../../models/orders';
const req = (0, supertest_1.default)(server_1.default);
describe('Testing Users handlers ', () => {
    // to intiate a token
    const user = {
        id: 2,
        firstname: 'Shabibz',
        lastname: 'Dos',
        password: 'xxx',
        email: '1234@gmail.com'
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
    it('Endpoint [INDEX] product', async () => {
        const res = await req
            .get('/orders/2')
            .set('Authorization', `Bearer ${secrect_token}`);
        expect(res.status).toBe(200);
    });
});
