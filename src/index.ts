import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import initializer  from './routes/initializer';
import splitter from './routes/splitter';
import merger from './routes/merger';
import graph from './routes/graph';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express()
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/graph', initializer, splitter, merger, graph);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from graph-solver!')
})

app.listen(port, () => {
    console.log(`graph-solver application listening on port: ${port}`)
})