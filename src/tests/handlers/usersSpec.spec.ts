import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/users';


const req = supertest(app);



describe('Testing Users handlers ', () => {

    const user: User= {
        id: 2,
        firstname: 'Shabibz',
        lastname: 'Dos',
        password: 'xxx',
        email: '1234@gmail.com'
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


    it('User login [create JWT]', async () => {
        const res= await req
          .post(`/users/login`)
          .send(user)
        expect(res.status).toBe(200);
      });


    it('Endpoint [Index] with invalid token',async () => {
       const res= await req
        .get('/users')
        .set('Authorization', `Bearer JWTtokenNotSecrect`)
        expect(res.status).toBe(401)
    })



    it('Endpoint [Index] with VALID token',async () => {

        const res= await req
         .get('/users')
         .set('Authorization', `Bearer ${secrect_token}`) // setting the token for verification
         expect(res.status).toBe(200)
     })

     it('Endpoint [show] with VALID token',async () => {

        const res= await req
         .get('/users/2')
         .send(user)
         .set('Authorization', `Bearer ${secrect_token}`) 
         expect(res.status).toBe(200)
     })

     it('Endpoint [CREATE] user',async () => {
        const res= await req
         .post('/users')
         .send(user)
         expect(res.status).toBe(200)
     })


   
})
