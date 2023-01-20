import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/users';
import { Product } from '../../models/products';



const req = supertest(app);

describe('Testing Product handlers ', () => {

    // to intiate a token
    const user: User= {
        id: 2,
        firstname: 'Shabibz',
        lastname: 'Dos',
        password: 'xxx',
        email: '1234@gmail.com'
    };

    const product: Product= {
        id: 2,
        price: 99,
        name: 'PS5',
        category: 'Games-Platform',
    };

    // To assgin a new token
    let secrect_token: string

    beforeAll(async () => {
        process.env.ENV= 'TEST'


        await req
            .post('/users/login')
            .send({
                email: "1234@gmail.com",
                password: 'xxx'
            })
            .then((res)=>{
                 secrect_token= res.body.token;
                //  console.log('SpectTest',secrect_token)
            })

    })


    it('Endpoint [Index] product',async () => {
       const res= await req
        .get('/products')
        expect(res.status).toBe(200)
    })



    it('Endpoint [show] product',async () => {
        const res= await req
         .get('/products/1')
         expect(res.status).toBe(200)
     })


     it('Endpoint [CREATE] product with VALID token',async () => {
        const res= await req
         .post('/products')
         .send(product)
         .set('Authorization', `Bearer ${secrect_token}`) 
         expect(res.status).toBe(200)
     })


     it('Endpoint [CREATE] product with INVALID token',async () => {
        const res= await req
         .post('/products')
         .send(product)
         .set('Authorization', `Bearer JWTtokenNotSecrect`) 
         expect(res.status).toBe(404)
     })


   
})
