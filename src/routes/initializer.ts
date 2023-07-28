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

router.post('/initialize', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    let totalVertices = req.body.totalVertices ? req.body.totalVertices : 0;
    let totalEdges = req.body.totalEdges ? req.body.totalEdges : 0;
    let totalComponents = req.body.totalComponents ? req.body.totalComponents : 0;

    let edgeWeightLowerBound = req.body.edgeWeightLowerBound ? req.body.edgeWeightLowerBound : 0;
    let edgeWeightUpperBound = req.body.edgeWeightUpperBound ? req.body.edgeWeightUpperBound : 10;

    let xAxisLowerBound = req.body.xAxisLowerBound ? req.body.xAxisLowerBound : -100;
    let xAxisUpperBound = req.body.xAxisUpperBound ? req.body.xAxisUpperBound : 100;
    let yAxisLowerBound = req.body.yAxisLowerBound ? req.body.yAxisLowerBound : -100;
    let yAxisUpperBound = req.body.yAxisUpperBound ? req.body.yAxisUpperBound : 100;

    let componentInitializer: IComponentInitializer = new ComponentInitializer(totalComponents);
    let edgeInitializer: IEdgeInitializer = new EdgeInitializer(totalEdges, edgeWeightLowerBound, edgeWeightUpperBound);
    let vertexInitializer: IVertexInitializer = new VertexInitializer(totalVertices);

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