import express, { Router, Request, Response } from 'express'
import Component from '../models/component'
import GraphInitializer from '../services/graphInitializer'
import IGraphInitializer from '../services/graphInitializerInterface'

const router: Router = express.Router()

router.get('/initialize', (req: Request, res: Response) => {
    console.log(req.body)

    res.setHeader('Content-Type', 'application/json');
    
    let graphInitializer: IGraphInitializer = new GraphInitializer();

    const components: Array<Component> = graphInitializer.initializeGraph(10, 10, 3)

    res.send({ "graph": {
        "components": components
    }})
})

export default router