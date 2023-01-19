"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// secret toekn saved in .env file
const { TOKEN_SIGN } = process.env;
const signToken = (email) => {
    const token = (0, jsonwebtoken_1.sign)({ user: email }, TOKEN_SIGN);
    return token;
};
exports.signToken = signToken;
const verifyToken = (req, email) => {
    try {
        // getting the token from cookies or from headers
        let token = req.cookies.access_token || req.headers.authorization.split(' ')[1];
        // Verification
        // console.log("Verify:", token)
        const decodedToken = (0, jsonwebtoken_1.verify)(token, TOKEN_SIGN); // Getting the payload
        // Verification
        // console.log("XXXX", decodedToken.user)
        // console.log("XXXX", email)
        // not same user
        if (email && decodedToken.user != email) {
            throw new Error('not authoraized attempt');
        }
    }
    catch (error) {
        // console.log('Token: ',error)
        throw new Error("Undefined token");
    }
};
exports.verifyToken = verifyToken;
