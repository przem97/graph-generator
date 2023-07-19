import express, { Router, Request, Response } from 'express';
import Edge from '../models/edge';
import Component from '../models/component';
import ComponentMerger from '../utils/component/merger/componentMerger';

const router: Router = express.Router();

router.post('/merge', (req: Request, res: Response) => {
    try {
        const graph = req.body.graph;

        const component1: Component =  new Component();
        const component2: Component =  new Component();
        const mergingEdge: Edge = new Edge(0, 0, 0);
        Object.assign(component1, graph.components[0]);
        Object.assign(component2, graph.components[1]);
        Object.assign(mergingEdge, req.body.mergingEdge);
    
        const mergedComponent: Component = new ComponentMerger().merge(component1, component2, mergingEdge);
    
        if (mergedComponent.isEmpty()) {
            res.status(202).send({ "message": "cannot merge components!"});   
        } else {
            res.send({ "graph": {
                "component": mergedComponent
            }});
        }
    } catch (err) {
        res.status(500).send({
            "message": "internal server error. check logs."
        });
    }
});

export default router;