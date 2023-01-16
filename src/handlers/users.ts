import { User, UserModel } from '../models/users';
import express, { Request, Response } from 'express';
import { verifyToken, signToken } from './utils';

const Users= new UserModel();

const showAll=async (req: Request, res: Response) => {

    try {
        verifyToken(req);
        const users= await Users.index() //all users
        res.send(users);
    } catch (err) {
        
    }
    
}