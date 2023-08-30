import express, { Router, Request, Response } from 'express';
import Edge from '../models/edge';
import Component from '../models/component';
import EdgeManager from '../utils/edge/manager/edgeManager';

const router: Router = express.Router();

/**
 * @openapi
 * /graphs/edges:
 *   put:
 *     description: Add the edge to the graph 
 *     tags: 
 *       - EdgesAPI
 *     requestBody:      
 *       description: A graph and an edge to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                graph:
 *                  $ref: '#/components/schemas/graph'
 *                edge:
 *                  $ref: '#/components/schemas/edge'
 *     responses:
 *       200:
 *         description: Returns the graph with newly added edge
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#/components/schemas/graph'
 */
router.put('/edges', (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);
    const edge: Edge = Edge.fromRequest(req);

    const resultComponents = new EdgeManager().addEdge(components, edge);

    res.status(200).send({ "graph": {
        "components": resultComponents
    }});
});

/**
 * @openapi
 * /graphs/edges:
 *   delete:
 *     description: Remove the edge from the graph 
 *     tags: 
 *       - EdgesAPI
 *     requestBody:      
 *       description: A graph and an edge to remove
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                graph:
 *                  $ref: '#/components/schemas/graph'
 *                edge:
 *                  $ref: '#/components/schemas/edge'
 *     responses:
 *       200:
 *         description: Returns a graph with removed edge
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#/components/schemas/graph'
 */
router.delete('/edges', (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);
    const edgeToRemove: Edge = Edge.fromRequest(req);

    const resultComponents = new EdgeManager().removeEdge(components, edgeToRemove);

    res.status(200).send({ "graph": {
        "components": resultComponents
    }});
});

export default router;