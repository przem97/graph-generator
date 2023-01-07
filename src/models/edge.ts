import { Dictionary } from "lodash"

class Edge {
    startVertex: number
    endVertex: number

    constructor(x: number, y: number) {
        [x, y] = [x, y].sort((a: number, b: number) => a - b)
        this.startVertex = x
        this.endVertex = y
    }

    toIndex(vertexToIndex: Dictionary<number>): Edge {
        return new Edge(vertexToIndex[this.startVertex], vertexToIndex[this.endVertex])
    }
}

export default Edge