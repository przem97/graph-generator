import express, { Router, Request, Response } from 'express';
import Component from '../models/component';
import GraphInitializer from '../services/initializer/graph/graphInitializer';
import CoordinatesInitializer from '../services/initializer/coordinates/coordinatesInitializer';
import IGraphInitializer from '../services/initializer/graph/interface/graphInitializer.interface';
import ICoordinatesInitializer from '../services/initializer/coordinates/interface/coordinatesInitializer.interface';

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

    let graphInitializer: IGraphInitializer = new GraphInitializer(
        totalVertices,
        totalEdges,
        totalComponents,
        edgeWeightLowerBound,
        edgeWeightUpperBound
    );
    
    let coordinatesInitializer: ICoordinatesInitializer = new CoordinatesInitializer(xAxisLowerBound,
        xAxisUpperBound, yAxisLowerBound, yAxisUpperBound);

    const components: Array<Component> = graphInitializer.initializeGraph();

    coordinatesInitializer.initializeCoordinates(components); 

    res.send({ "graph": {
        "components": components
    }})
})

export default router