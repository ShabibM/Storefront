"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const req = (0, supertest_1.default)(server_1.default);
describe('Testing Users handlers ', () => {
    const user = {
        id: 2,
        firstname: 'Shabib',
        lastname: 'Dos',
        password: '123',
        email: '1234@gmail.com'
    };
    // To assgin a new token
    let secrect_token;
    beforeAll(async () => {
        await req
            .post('/users/login')
            .send({
            email: "123@gmail.com",
            password: 123
        })
            .then((res) => {
            secrect_token = res.text;
        });
    });
    it('Endpoint [Index] with invalid token', async () => {
        const res = await req
            .get('/users')
            .set('Authorization', `Bearer radnomtoken`);
        expect(res.status).toBe(401);
    });
    it('User login [create JWT]', async () => {
        const res = await req
            .post(`/users/login`)
            .send(user);
        expect(res.status).toBe(200);
    });
    it('Endpoint [Index] with VALID token', async () => {
        const res = await req
            .get('/users')
            .set('Authorization', `Bearer ${secrect_token}`);
        expect(res.status).toBe(200);
    });
    it('Endpoint [CREATE] user', async () => {
        const res = await req
            .post('/users')
            .set(user);
        expect(res.status).toBe(200);
    });
});
