"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// ------------- Importing Routes -------------
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const address = "127.0.0.1:3000";
const port = 3000;
// ------------- Linking Middlewares -------------
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(users_1.default);
// userRoutes(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
// app.get('/users', function (req: Request, res: Response) {
//     res.send('Hello World!')
// })
// ------------- Starting Server -------------
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
