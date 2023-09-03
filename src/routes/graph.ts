import express, { Router, Request, Response } from 'express';
import Component from '../models/component';
import { GraphModel } from '../models/graph';

const router: Router = express.Router();

/**
 * @openapi
 * /graphs:
 *   get:
 *     tags:
 *       - GraphAPI
 *     description: Get all the graphs in the database
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Returns all the graphs in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphs:
 *                   type: array
 *                   items:
 *                     $ref: '#components/schemas/graphDTO'
 */
router.get('', (req: Request, res: Response) => {
    GraphModel
        .find({})
        .then(graphs => {
            res.status(200).send({ "graphs": graphs });
        })
        .catch(err => {
            res.status(404).send({ "error": err});
        })
});

/**
 * @openapi
 * /graphs:
 *   post:
 *     tags:
 *       - GraphAPI
 *     description: Save new graph in the database
 *     requestBody:
 *       description: A graph object to save
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
 *         description: Returns all the graphs in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#components/schemas/graphDTO'       
 */
router.post('', (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);

    const graphModel = new GraphModel({ components: components });
    graphModel.save()
        .then(graphs => {
            res.status(200).send({ "graph": graphs});
        })
        .catch(err => {
            res.status(404).send({ "error": err});
        });
});

/**
 * @openapi
 * /graphs:
 *   put:
 *     tags:
 *       - GraphAPI
 *     description: Update a graph in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the graph
 *         schema:
 *           id:
 *             type: string
 *             example: 64e4b75abba56caf30c7c9f0
 *     requestBody:
 *       description: A graph object to update
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
 *         description: Returns all the graphs in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graph:
 *                   $ref: '#components/schemas/graphDTO'       
 */
router.put('/:id', (req: Request, res: Response) => {
    const components: Component[] = Component.componentsFromRequest(req);

    GraphModel.findOneAndUpdate({ _id: req.params.id }, { components: components })
        .then(graphs => {
            res.status(200).send({ "graph": graphs});
        })
        .catch(err => {
            res.status(404).send({ "error": err});
        });
});

/**
 * @openapi
 * /graphs/{id}:
 *   delete:
 *     tags:
 *       - GraphAPI
 *     description: Delete graph with specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the graph
 *         schema:
 *           id:
 *             type: string
 *             example: 64e4c7d87aed4aa8856ac13d
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   example: true
 *                 deletedCount:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: MongoDB error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: critical error
 */
router.delete('/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;

    GraphModel.deleteOne({ _id: id })
        .then(graphs => {
            res.status(200).send(graphs);
        })
        .catch(err => {
            res.status(404).send({ "error": err});
        });
});

export default router;