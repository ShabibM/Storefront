import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';


// secret toekn saved in .env file
const {TOKEN_SECRET}= process.env;


const signToken= (email: string) =>{
    const token= sign({user: email},TOKEN_SECRET as string)
return token
}

const verifyToken= (req: Request, email?: string) => {

    try {
         // getting the token from cookies or from headers
        let token = req.cookies.access_token || req.headers.authorization!.split(' ')[1];
        console.log("Verify:", token)
        const decodedToken = verify(token as string, TOKEN_SECRET as string) as JwtPayload; // Getting the payload
        
    
        // Verification
        console.log("XXXX", decodedToken.user)
        console.log("XXXX", email)
    
        // not same user
        if(email && decodedToken.user != email){
            throw new Error ('not authoraized attempt')
            
        }
    } catch (error) {
        // console.log('Token: ',error)
        throw new Error("Undefined token")
    }
   
    
}



export {signToken, verifyToken};

