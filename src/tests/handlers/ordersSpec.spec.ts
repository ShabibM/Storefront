import supertest from 'supertest';
import app from '../../server';
// import { orders } from '../../models/orders';



const req = supertest(app);

describe('Testing Orders handlers ', () => {

    // To assgin a new token
    let secrect_token: string

    beforeAll(async () => {
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


    it('Endpoint [INDEX] order',async () => {
        const res= await req
         .get('/orders/2')
         .set('Authorization', `Bearer ${secrect_token}`) 
         expect(res.status).toBe(200)
     })
   
})
