import express, { Router, Request, Response } from 'express';
import Edge from '../models/edge';
import Component from '../models/component';
import EdgeManager from '../utils/edge/manager/edgeManager';

const router: Router = express.Router();

const EDGE = 'edge';

router.put(`/${EDGE}`, (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);
    const edge: Edge = Edge.fromRequest(req);

    const resultComponents = new EdgeManager().addEdge(components, edge);

    res.status(200).send({ "graph": {
        "components": resultComponents
    }});
});

router.delete(`/${EDGE}`, (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);
    const edgeToRemove: Edge = Edge.fromRequest(req);

    const resultComponents = new EdgeManager().removeEdge(components, edgeToRemove);

    res.status(200).send({ "graph": {
        "components": resultComponents
    }});
});

export default router;