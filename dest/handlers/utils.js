"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// secret toekn saved in .env file
const { TOKEN_SECRET } = process.env;
const signToken = (email) => {
    const token = (0, jsonwebtoken_1.sign)({ user: email }, TOKEN_SECRET);
    return token;
};
exports.signToken = signToken;
const verifyToken = (req, email) => {
    const token = req.cookies.access_token; // getting the token 
    const decodedToken = (0, jsonwebtoken_1.verify)(token, TOKEN_SECRET); // Getting the payload
    // Verification
    console.log("XXXX", decodedToken.user);
    console.log("XXXX", email);
    // not same user
    if (email && decodedToken.user != email) {
        throw new Error('not authoraized attempt');
    }
};
exports.verifyToken = verifyToken;
