import express, { Router, Request, Response } from 'express';
import { GraphModel } from '../models/graph';
import Vertex from '../models/vertex';
import Component from '../models/component';
import VertexManager from '../utils/vertex/manager/vertexManager';
import SetBasedComponentManager from '../utils/component/manager/setBasedComponentManager';

const router: Router = express.Router();

/**
 * @openapi
 * /graphs/vertices:
 *   put:
 *     description: Add the vertex to the graph
 *     tags:
 *       - VerticesAPI
 *     requestBody:
 *        description: A graph and a vertex to add
 *        content:
 *          appliaction/json:
 *            schema:
 *              type: object
 *              properties:
 *                graph:
 *                  $ref: '#components/schemas/graph'
 *                vertex:
 *                  $ref: '#components/schemas/vertex'
 *     responses:
 *        200:
 *          description: Returns a graph with newly added vertex
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  graph:
 *                    $ref: '#/components/schemas/graph'
 */
router.put('/vertices', (req: Request, res: Response) => {
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
    
    const graph = new GraphModel({ components: components});
    graph.save()
    .then((data) => {
        console.log('saved successfully!', data);
    })
    .catch((err) => {
        console.log('error saving the graph!', err);
    });

    res.status(200).send({ "graph": {
        "components": components
    }});
});

/**
 * @openapi
 * /graphs/vertices:
 *   delete:
 *     description: Remove the vertex from the graph
 *     tags:
 *       - VerticesAPI
 *     requestBody:
 *        description: A graph and a vertex to remove
 *        content:
 *          appliaction/json:
 *            schema:
 *              type: object
 *              properties:
 *                graph:
 *                  $ref: '#components/schemas/graph'
 *                vertex:
 *                  $ref: '#components/schemas/vertex'
 *     responses:
 *        200:
 *          description: Returns a graph with removed vertex
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  graph:
 *                    $ref: '#/components/schemas/graph'
 */
router.delete('/vertices', (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);
    const vertexToRemove: Vertex = Vertex.fromRequest(req);

    const resultComponents = new VertexManager().removeVertex(components, vertexToRemove);

    res.status(200).send({ "graph": {
        "components": resultComponents
    }});
});

export default router;