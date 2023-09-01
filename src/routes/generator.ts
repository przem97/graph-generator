import express, { Router, Request, Response } from 'express';
import Component from '../models/component';
import EdgeInitializer from '../services/initializer/edge/edgeInitializer';
import GraphInitializer from '../services/initializer/graph/graphInitializer';
import VertexInitializer from '../services/initializer/vertex/vertexInitializer';
import ComponentInitializer from '../services/initializer/component/componentInitializer';
import CoordinatesInitializer from '../services/initializer/coordinates/coordinatesInitializer';
import IEdgeInitializer from '../services/initializer/edge/edgeInitializer.interface';
import IGraphInitializer from '../services/initializer/graph/graphInitializer.interface';
import IVertexInitializer from '../services/initializer/vertex/vertexInitializer.interface';
import IComponentInitializer from '../services/initializer/component/componentInitializer.interface';
import ICoordinatesInitializer from '../services/initializer/coordinates/coordinatesInitializer.interface';

const router: Router = express.Router()

router.use('/generate', (req, res, next) => {
    if (!req.body.totalVertices) {
        res.status(405).send({ "message": "please specify 'totalVertices' parameter" });
    }
    if (!req.body.totalEdges) {
        res.status(405).send({ "message": "please specify 'totalEdges' parameter" });
    }
    if (!req.body.totalComponents) {
        res.status(405).send({ "message": "please specify 'totalComponents' parameter" });
    }
    next();
});

/**
 * @openapi
 * /graphs/generate:
 *   post:
 *     description: API for generating the graph
 *     tags: 
 *       - GeneratorAPI
 *     requestBody:
 *       description: Bunch of metadata describing graph
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalVertices:
 *                 type: integer
 *                 example: 2
 *                 required: true
 *               totalEdges:
 *                 type: integer
 *                 example: 3
 *                 required: true
 *               totalComponents:
 *                 type: integer
 *                 example: 4
 *                 required: true
 *               edgeWeightLowerBound:
 *                 type: number
 *                 format: double
 *                 example: 3.14
 *                 default: 0
 *               edgeWeightUpperBound:
 *                 type: number
 *                 format: double
 *                 example: 3.15
 *                 default: 10
 *               xAxisLowerBound:
 *                 type: number
 *                 format: double
 *                 example: -23.1
 *                 default: -100
 *               xAxisUpperBound:
 *                 type: number
 *                 format: double
 *                 example: 16.4
 *                 default: 100
 *               yAxisLowerBound:
 *                 type: number
 *                 format: double
 *                 example: -123.45
 *                 default: -100
 *               yAxisUpperBound:
 *                 type: number
 *                 format: double
 *                 example: -100.06
 *                 default: 100
 *               startId:
 *                 type: integer
 *                 example: 15
 *                 default: 0
 *     responses:
 *       200:
 *         description: Returns generated graph according to specified criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#/components/schemas/graph'
 *       405:
 *         description: Graph metadata parameters are not specified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum: 
 *                     - please specify 'totalVertices' parameter
 *                     - please specify 'totalEdges' parameter
 *                     - please specify 'totalComponents' parameter
 *                   example: please specify 'totalVertices' parameter
 */
router.post('/generate', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    let totalVertices = req.body.totalVertices;
    let totalEdges = req.body.totalEdges;
    let totalComponents = req.body.totalComponents;

    let edgeWeightLowerBound = req.body.edgeWeightLowerBound ? req.body.edgeWeightLowerBound : 0;
    let edgeWeightUpperBound = req.body.edgeWeightUpperBound ? req.body.edgeWeightUpperBound : 10;

    let xAxisLowerBound = req.body.xAxisLowerBound ? req.body.xAxisLowerBound : -100;
    let xAxisUpperBound = req.body.xAxisUpperBound ? req.body.xAxisUpperBound : 100;
    let yAxisLowerBound = req.body.yAxisLowerBound ? req.body.yAxisLowerBound : -100;
    let yAxisUpperBound = req.body.yAxisUpperBound ? req.body.yAxisUpperBound : 100;

    let startId = req.body.startId ? req.body.startId : 0;

    let componentInitializer: IComponentInitializer = new ComponentInitializer(totalComponents);
    let edgeInitializer: IEdgeInitializer = new EdgeInitializer(totalEdges, edgeWeightLowerBound, edgeWeightUpperBound);
    let vertexInitializer: IVertexInitializer = new VertexInitializer(totalVertices, startId);

    let graphInitializer: IGraphInitializer = new GraphInitializer(
        componentInitializer,
        edgeInitializer,
        vertexInitializer
    );
    
    let coordinatesInitializer: ICoordinatesInitializer = new CoordinatesInitializer(xAxisLowerBound,
        xAxisUpperBound, yAxisLowerBound, yAxisUpperBound);

    let components: Array<Component> = graphInitializer.initializeGraph();
    components = coordinatesInitializer.initializeCoordinates(components); 

    res.send({ "graph": {
        "components": components
    }})
})

export default router