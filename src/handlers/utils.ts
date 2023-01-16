import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';


// secret toekn saved in .env file
const {TOKEN_SECRET}= process.env;


const signToken= (email: string) =>{
    const token= sign({user: {email}},TOKEN_SECRET as string)
return token
}

const verifyToken= (req: Request, email?: string) => {
    const token = req.headers.authorization!.split(' ')[1]; // getting the token 
    const decodedToken = verify(token as string, TOKEN_SECRET as string) as JwtPayload; // Getting the payload

    // not same user
    if(decodedToken.user.email != email){
        throw new Error ('not authoraized attempt')
    }
    
}



export {signToken, verifyToken};

