"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const users_router = express_1.default.Router();
// Contains DB SQL methods
const Users = new users_1.UserModel();
const showAll = async (req, res) => {
    try {
        (0, utils_1.verifyToken)(req);
        const users = await Users.index(); //all users
        res.send(users).status(200);
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
};
const show = async (req, res) => {
    try {
        const email = req.body.email;
        const id = Number(req.params.id);
        (0, utils_1.verifyToken)(req, email);
        const users = await Users.show(id); // get signle user
        res.send(users).status(200);
    }
    catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
};
const create = async (req, res) => {
    try {
        // verifyToken(req);
        const { firstname, lastname, password, email } = req.body;
        const user = await Users.create(firstname, lastname, password, email);
        res.send(user);
    }
    catch (err) {
        console.log(err);
        res.status(401).send(err);
    }
};
const auth = async (req, res) => {
    const { email, password } = req.body;
    console.log('Xz', email);
    if (password == undefined || email == undefined) {
        res.status(400).send('Missing parameters');
    }
    const user = await Users.auth(email, password);
    if (user === null) {
        res.status(401).send('Wrong password.');
    }
    // Correct password THEN create token
    const token = (0, utils_1.signToken)(email);
    return res.
        cookie('access_token', token, {
        httpOnly: true,
    })
        .status(200)
        .json({ message: "Logged in Successfully" });
};
//   JWT auth is used within the endpoint not AS a middleware
users_router.get('/users', showAll);
users_router.get('/users/:id', show);
users_router.post('/users', create);
users_router.post('/users/login', auth);
exports.default = users_router;
