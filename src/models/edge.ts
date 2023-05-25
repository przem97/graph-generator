import { Dictionary } from "lodash"

class Edge {
    startVertex: number;
    endVertex: number;
    weight: number;

    constructor(x: number, y: number, weight: number = 0) {
        [x, y] = [x, y].sort((a: number, b: number) => a - b);
        this.startVertex = x;
        this.endVertex = y;
        this.weight = weight;
    }

    toIndex(vertexToIndex: Dictionary<number>): Edge {
        return new Edge(vertexToIndex[this.startVertex], vertexToIndex[this.endVertex], this.weight);
    }
}

export default Edge;