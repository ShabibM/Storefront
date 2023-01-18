import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/users';


const req = supertest(app);

describe('Testing Users handlers ', () => {

    const user: User= {
        id: 2,
        firstname: 'Shabib',
        lastname: 'Dos',
        password: 'xxx',
        email: '"1234@gmail.com"'
    };

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
                 console.log('SpectTest',secrect_token)
            })

    })

    // it('Endpoint [Index] with invalid token',async () => {
    //    const res= await req
    //     .get('/users')
    //     .set('Authorization', `Bearer radnomtoken`)
    //     expect(res.status).toBe(401)
    // })

    // it('User login [create JWT]', async () => {
    //     const res= await req
    //       .post(`/users/login`)
    //       .send(user)
    //     expect(res.status).toBe(200);
    //   });


    it('Endpoint [Index] with VALID token',async () => {
        console.log('SpectTest',secrect_token)

        const res= await req
         .get('/users')
         .send(user)
         expect(res.status).toBe(200)
     })

    //  it('Endpoint [CREATE] user',async () => {
    //     const res= await req
    //      .post('/users')
    //      .set(user)
    //      expect(res.status).toBe(200)
    //  })


   
})
