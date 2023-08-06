import express, { Router, Request, Response } from 'express';
import Edge from '../models/edge';
import Vertex from '../models/vertex';
import Component from '../models/component';
import EdgeManager from '../utils/edge/manager/edgeManager';
import VertexManager from '../utils/vertex/manager/vertexManager';
import SetBasedComponentManager from '../utils/component/manager/setBasedComponentManager';

const router: Router = express.Router();

const ADD = '/add';
const REMOVE = '/remove';

router.put(ADD + '/vertex', (req: Request, res: Response) => {
    try {
        const components: Component[] = Component.componentsFromRequest(req);
        const vertex: Vertex = Vertex.fromRequest(req);

        for (const component of components) {
            const manager = SetBasedComponentManager.ofComponent(component);
            if (manager.hasVertex(vertex)) {
                res.status(400).send({ "message": "vertex with speficied ordinal already exists!"});
                return;
            }
        }

        components.push(new Component([], [ vertex ]));
    
        res.status(200).send({ "graph": {
            "components": components
        }});
    } catch (err) {
        res.status(500).send({
            "message": "internal server error. check logs."
        });
    }
});

router.put(ADD + '/edge', (req: Request, res: Response) => {
    try {
        const components: Component[] = Component.componentsFromRequest(req);
        const edge: Edge = Edge.fromRequest(req);

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

router.delete(REMOVE + '/edge', (req: Request, res: Response) => {
    try {
        const components: Component[] = Component.componentsFromRequest(req);
        const edgeToRemove: Edge = Edge.fromRequest(req);

        const resultComponents = new EdgeManager().removeEdge(components, edgeToRemove);
    
        res.status(200).send({ "graph": {
            "components": resultComponents
        }});
    } catch (err) {
        res.status(500).send({
            "message": "internal server error. check logs."
        });
    }
});

router.delete(REMOVE + '/vertex', (req: Request, res: Response) => {
    try {
        const components: Component[] = Component.componentsFromRequest(req);
        const vertexToRemove: Vertex = Vertex.fromRequest(req);

        const resultComponents = new VertexManager().removeVertex(components, vertexToRemove);
    
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