import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address: string = "127.0.0.1:3000"
const port= 3000;

app.use(bodyParser.json())
app.use(express.json());


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
