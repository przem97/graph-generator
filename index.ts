import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import initializer  from './src/routes/initializer'
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express()
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/graph', initializer)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.listen(port, () => {
    console.log(`graph-solver application listening on port: ${port}`)
})