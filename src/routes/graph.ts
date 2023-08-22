import express, { Router, Request, Response } from 'express';
import Component from '../models/component';
import { GraphModel } from '../models/graph';

const router: Router = express.Router();

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

router.delete('', (req: Request, res: Response) => {
    const id: number = req.body.id;

    GraphModel.deleteOne({ _id: id })
        .then(graphs => {
            res.status(200).send({ "graph": graphs});
        })
        .catch(err => {
            res.status(404).send({ "error": err});
        });
});

export default router;