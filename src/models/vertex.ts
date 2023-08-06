import { Request } from "express";

class Vertex {
    readonly ordinal: number;
    readonly x: number;
    readonly y: number;

    constructor(ordinal: number, x: number = 0, y: number = 0) {
        this.ordinal = ordinal;
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