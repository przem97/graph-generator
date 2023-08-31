import express, { Router, Request, Response } from 'express';
import Edge from '../models/edge';
import Component from '../models/component';
import ComponentMerger from '../utils/component/merger/componentMerger';

const router: Router = express.Router();

/**
 * @openapi
 * /graphs/merge:
 *   post:
 *     description: Merge components within the graph with speficied edge
 *     tags:
 *       - MergeAPI
 *     requestBody:
 *       description: The graph object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstComponent:
 *                 $ref: '#components/schemas/component'
 *               secondComponent:
 *                 $ref: '#components/schemas/component'
 *               mergingEdge:
 *                 $ref: '#components/schemas/edge'
 *     response:
 *       200:
 *         description: The graph object with merged components
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#components/schemas/graph'
 *       202:
 *         description: Components cannot be merged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cannot merge components
 */
router.post('/merge', (req: Request, res: Response) => {
    const component1: Component =  new Component();
    const component2: Component =  new Component();
    const mergingEdge: Edge = new Edge(0, 0, 0);
    Object.assign(component1, req.body.firstComponent);
    Object.assign(component2, req.body.secondComponent);
    Object.assign(mergingEdge, req.body.mergingEdge);

    const mergedComponent: Component = new ComponentMerger().merge(component1, component2, mergingEdge);

    if (mergedComponent.isEmpty()) {
        res.status(202).send({ "message": "Cannot merge components"});   
    } else {
        res.send({ "graph": {
            "components": mergedComponent
        }});
    }
});

export default router;