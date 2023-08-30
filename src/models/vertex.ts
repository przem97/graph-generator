import { Request } from "express";

class Vertex {
    readonly id: number;
    readonly x: number;
    readonly y: number;

    constructor(id: number, x: number = 0, y: number = 0) {
        this.id = id;
        this.x = x;
        this.y = y;
    }

    static fromRequest(req: Request): Vertex {
        const vertex: Vertex = new Vertex(0, 0, 0);

        Object.assign(vertex, req.body.vertex);
   
        return vertex;
    }
}

export default Vertex;