import express,{ Application ,Request, Response } from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';

// ------------- Importing Routes -------------
import users_router from "./handlers/users"
import productRoutes from "./handlers/products"
import orderRoutes from "./handlers/orders"



const app: Application = express()
const address: string = "127.0.0.1:3000"
const port= 3000;

// ------------- Linking Middlewares -------------
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())

app.use(users_router);
// userRoutes(app);
productRoutes(app);
orderRoutes(app);



// app.get('/users', function (req: Request, res: Response) {
//     res.send('Hello World!')
// })




// ------------- Starting Server -------------

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})



export default app;
