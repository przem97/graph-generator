import express, { Router, Request, Response } from 'express'
import initializeGraph from '../services/graphInitializer'

const router: Router = express.Router()

router.get('/initialize', (req: Request, res: Response) => {
    console.log(req.body)

    res.setHeader('Content-Type', 'application/json');
    
    const components: object = initializeGraph(10, 10, 3)

    res.send({ "graph": {
        "components": components
    }})
})

export default router