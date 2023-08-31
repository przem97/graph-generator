import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import initializer  from './routes/generator';
import splitter from './routes/splitter';
import merger from './routes/merger';
import vertex from './routes/vertex';
import graph from './routes/graph';
import edge from './routes/edge';
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from './api/api-docs';

const dotenvConfig = dotenv.config();
expand(dotenvConfig);

const app: Express = express()
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/v1/graphs', initializer, splitter, merger, graph, edge, vertex);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from graph-solver!')
})

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI || '');
}

app.listen(port, () => {
    console.log(`graph-solver application listening on port: ${port}`)
})

const openapiSpecification = swaggerJsdoc(options);

// OpenAPI UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);