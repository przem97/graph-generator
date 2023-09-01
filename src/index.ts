import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import generator  from './routes/generator';
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

// expanded dotenv configuration
const dotenvConfig = dotenv.config();
expand(dotenvConfig);

// application base configuration
const PORT = process.env.PORT;
const API_VERSION = 'v1';
const GRAPHS_PATH = `/${API_VERSION}/graphs`;

// application instance
const app: Express = express();

// base middleware configuration
app.use(bodyParser.json());
app.use(cors());

// mount different routes
app.use(GRAPHS_PATH, splitter);
app.use(GRAPHS_PATH, merger);
app.use(GRAPHS_PATH, graph);
app.use(GRAPHS_PATH, edge);
app.use(GRAPHS_PATH, vertex);
app.use(GRAPHS_PATH, generator);

app.get('/', (req: Request, res: Response) => {
    res.redirect('/api-docs')
})

// setup mongoose connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI || '');
}

// start express application
app.listen(PORT, () => {
    console.log(`graph-solver application listening on port: ${PORT}`)
})

// OpenAPI realted configuration & serve Swagger UI
const openapiSpecification = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);