import { User, UserModel } from '../../models/users';

const userModel= new UserModel();


    const user: User= {
        id: 2,
        firstname: 'Hamza',
        lastname: 'A',
        password: 'xx',
        email: '123@gmail.com'
    };

describe('Testing Users Model', () => {

    beforeAll(async () => {
      process.env.ENV= 'TEST'

    })

    it('Checking create function', () => {
      expect(userModel.create).toBeDefined();
    });

   
    it('Checking show function, showing a user', async () => {
        const User= await userModel.show(user.id);
        expect(User.firstname).toEqual(user.firstname);
      });

      it('Checking auth function, authenticate a user', async () => {
        const User= await userModel.auth(user.email, user.password);
        expect(User!.firstname).toEqual(user.firstname);
      });


    it('Checking index function', () => {
        expect(userModel.index).toBeDefined();
    });

})