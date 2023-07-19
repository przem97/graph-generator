import express, { Router, Request, Response } from 'express';
import Edge from '../models/edge';
import Component from '../models/component';
import EdgeManager from '../utils/edge/manager/edgeManager';

const router: Router = express.Router();

const ADD = '/add';

router.post(ADD + '/edge', (req: Request, res: Response) => {
    try {
        const graph = req.body.graph;
        const components: Component[] = [];

        for (let i = 0; i < graph.components.length; i++) {
            const component: Component =  new Component();
            Object.assign(component, graph.components[i]);
            components.push(component);
        }

        const edge: Edge = new Edge(0, 0, 0);
        Object.assign(edge, req.body.edge);

        const resultComponents = new EdgeManager().addEdge(components, edge);
    
        res.status(200).send({ "graph": {
            "components": resultComponents
        }});
    } catch (err) {
        res.status(500).send({
            "message": "internal server error. check logs."
        });
    }
});

export default router;