import express, { Router, Request, Response } from 'express';
import Component from '../models/component';
import ComponentSplitter from '../utils/component/splitter/componentSplitter';

const router: Router = express.Router();

/**
 * @openapi
 * /graphs/split:
 *   post:
 *     description: Given the graph find the components which can be splitted and split them into smaller ones
 *     tags:
 *       - SplitAPI
 *     requestBody:
 *       description: The graph object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               graph:
 *                 $ref: '#components/schemas/graph'
 *     responses:
 *       200:
 *         description: The graph object with splitted components
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#components/schemas/graph'
 *       202:
 *         description: No components to split
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No components to split
 */
router.post('/split', (req: Request, res: Response) => {
    const graph = req.body.graph;

    const component: Component =  new Component();
    Object.assign(component, graph.components[0]);

    const components: Component[] = new ComponentSplitter().split(component);

    if (components.length === 1) {
        res.status(202).send({ "message": "No components to split"});   
    } else {
        res.send({ "graph": {
            "components": components
        }});
    }
});

export default router;