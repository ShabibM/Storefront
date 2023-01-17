import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

// ------------- Importing Routes -------------
import userRoutes from "./handlers/users"
import productRoutes from "./handlers/products"
import orderRoutes from "./handlers/orders"



const app: express.Application = express()
const address: string = "127.0.0.1:3000"
const port= 3000;

// ------------- Linking Middlewares -------------
app.use(bodyParser.json())
app.use(express.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})





// ------------- Starting Server -------------

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
