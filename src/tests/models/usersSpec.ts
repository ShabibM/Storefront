import { User, UserModel } from '../../models/users';

const userModel= new UserModel();


    const user: User= {
        id: 2,
        firstname: 'moha1',
        lastname: 'A',
        password: 'xxx',
        email: '1234@gmail.com'
    };

describe('Testing Users Model', () => {

    it('Checking create function', () => {
      expect(userModel.create).toBeDefined();
    });

   
    it('Checking show function, showing a user', async () => {
        const User= await userModel.show(user.id);
        expect(User.firstname).toEqual('moha1');
      });

      it('Checking auth function, authenticate a user', async () => {
        const User= await userModel.auth(user.email, user.password);
        expect(User!.firstname).toEqual('moha1');
      });


    it('Checking index function', () => {
        expect(userModel.index).toBeDefined();
    });

})