import express, { Router, Request, Response } from 'express'
import Component from '../models/component'
import GraphInitializer from '../services/graphInitializer'
import IGraphInitializer from '../services/graphInitializerInterface'

const router: Router = express.Router()

router.get('/initialize', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    
    let graphInitializer: IGraphInitializer = new GraphInitializer();

    let totalVertices = req.body.totalVertices ? req.body.totalVertices : 0;
    let totalEdges = req.body.totalEdges ? req.body.totalEdges : 0;
    let totalComponents = req.body.totalComponents ? req.body.totalComponents : 0;

    const components: Array<Component> = graphInitializer.initializeGraph(totalVertices, totalEdges, totalComponents)

    res.send({ "graph": {
        "components": components
    }})
})

export default router