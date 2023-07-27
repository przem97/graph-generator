import { Dictionary } from "lodash"
import Vertex from "./vertex";

class Edge {
    readonly startVertex: number;
    readonly endVertex: number;
    readonly weight: number;

    constructor(x: number, y: number, weight: number = 0) {
        [x, y] = [x, y].sort((a: number, b: number) => a - b);
        this.startVertex = x;
        this.endVertex = y;
        this.weight = weight;
    }

    toIndex(vertexToIndex: Map<number, number>): Edge {
        const startVertex = vertexToIndex.get(this.startVertex);
        const endVertex = vertexToIndex.get(this.endVertex);
        return new Edge((startVertex === undefined) ? NaN : startVertex,
                        (endVertex === undefined) ? NaN :endVertex, this.weight);
    }

    hasVertex(vertex: Vertex): Boolean {
        return this.startVertex === vertex.ordinal || this.endVertex === vertex.ordinal;
    }

    static fromVertices(startVertex: Vertex, endVertex: Vertex, weight: number = 0): Edge {
        return new Edge(startVertex.ordinal, endVertex.ordinal, weight);
    }
}

export default Edge;