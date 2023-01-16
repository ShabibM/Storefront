import { User, UserModel } from '../models/users';
import express, { Application, Request, Response } from 'express';
import { verifyToken, signToken } from './utils';

// Contains DB SQL methods
const Users= new UserModel();



const showAll=async (req: Request, res: Response) => {
    try {
        verifyToken(req);
        const users: User[]= await Users.index() //all users
        res.send(users);
    } catch (err) {
        res.status(404).send(err)
    }
    
}

const show=async (req: Request, res: Response) => {
    try {
        const email= req.body.email
        const id= Number(req.params.id)
        verifyToken(req, email);

        const users= await Users.show(id) // get signle user
        res.send(users);
    } catch (err) {
        res.status(404).send(err)
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        verifyToken(req);
      const { firstname, lastname, password, email } = req.body;
      const user = await Users.create(firstname, lastname, password, email);
      res.send(user);
    } catch (error) {
      const e = error as Error;
      if (e.message.includes('Failed to add the student')) {
        res.status(500).json(e.message);
      } else {
        res.status(401).json(e.message);
      }
    }
  };

const auth= async(req: Request, res: Response) => {

    const {email, password}= req.body;
    if(password == undefined || email || undefined){
        res.status(400).send('Missing parameters');
    }

    const user= await Users.auth(email, password)

    if(user === null){
        res.status(401).send('Wrong password.')
    }

    // Correct password THEN create token
    res.json(signToken(email))
}


//   JWT auth is used within the endpoint not AS a middleware
  const user_routes= (app: Application) =>{
    app.get('/users', showAll)
    app.get('/users:id', show)
    app.post('/users', create)
    app.post('/users/login', auth)

  }


  export default user_routes;