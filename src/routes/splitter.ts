import express, { Router, Request, Response } from 'express';
import Component from '../models/component';
import ComponentSplitter from '../utils/component/splitter/componentSplitter';

const router: Router = express.Router();

router.post('/split', (req: Request, res: Response) => {
    try {
        const graph = req.body.graph;

        const component: Component =  new Component();
        Object.assign(component, graph.components[0]);
    
        const components: Component[] = new ComponentSplitter().split(component);
    
        if (components.length === 1) {
            res.status(202).send({ "message": "no components to split!"});   
        } else {
            res.send({ "graph": {
                "components": components
            }});
        }
    } catch (err) {
        res.status(500).send({
            "message": "internal server error. check logs."
        });
    }
});

export default router;