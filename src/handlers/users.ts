import { User, UserModel } from '../models/users';
import express,{ Application, Request, Response } from 'express';
import { verifyToken, signToken } from './utils';
import app from '../server';


const users_router= express.Router()

// Contains DB SQL methods
const Users= new UserModel();



const index= async (req: Request, res: Response) => {
    try {
        verifyToken(req)
        
        const users: User[]= await Users.index() //all users
        res.send(users).status(200);
    } catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
    
}

const show=async (req: Request, res: Response) => {
    try {
        // Getting parameters
        const {email}= req.body
        const id= Number(req.params.id)

        // Check JWT
        verifyToken(req, email);

        // Call model
        const users= await Users.show(id) // get signle user
        res.send(users).status(200);
    } catch (err) {
        console.log(err)
        res.status(404).send(err)
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, password, email } = req.body;
      const user = await Users.create(firstname, lastname, password, email);
      res.send(user);
    } catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
  };

const auth= async(req: Request, res: Response) => {

    const {email, password}= req.body;
    if(password == undefined || email == undefined){
        res.status(400).send('Missing parameters');
        return
    }

    const user= await Users.auth(email, password)

    if(user === null){
        res.status(403).send('Wrong password.')
        return
    }

    // Correct password THEN create token
    const token= await signToken(email)

    return res
    .cookie('access_token',token, {
            httpOnly: true,
        })
        .status(200)
        .send({message: "Logged in Successfully", token: token});
}


//   JWT auth is used within the endpoint not AS a middleware
users_router.get('/users', index)
users_router.get('/users/:id', show)
users_router.post('/users', create)
users_router.post('/users/login', auth)

  


  export default users_router;
  