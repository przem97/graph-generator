import _, { Dictionary } from "lodash";
import Edge from "../models/edge";
import IGraphManager from "./graphManagerInterface"

/**
 * Utility class which provides basic operaions on graph like adding/removing edges and tree initialization
 */
class GraphManager implements IGraphManager {
    vertices: Array<number>;
    vertexToIndex: Dictionary<number>;
    numbers: Set<number>;
    notInitializedNumbers: Set<number>;

    /**
     * The graph is represented by a two sets where the inspiration was took from matrix representation of graph edges, namely,
     * the two sets 'numbers' and 'notInitializedNumbers' are holding every number of edge, since we operate on undirected graph the 
     * numbers which represents edges comes from the upper triangle over the diagonal of matrix-represented graph. The given vertices
     * are not required to be consecutive numbers (when sorted) since mapping between vertex and specific index is performed.
     * @param {Array.<number>} vertices - The list of vertices
     */
    constructor(vertices: Array<number>) {
        this.vertices = vertices
        this.vertexToIndex = {}
        
        for (let i = 0; i < this.vertices.length; i += 1) {
            this.vertexToIndex[this.vertices[i]] = i
        }

        this.numbers = new Set()
        this.notInitializedNumbers = new Set(_.flatMap(_.range(1, this.vertices.length).map((x) => _.range(x, this.vertices.length).map((y) => this.vertices.length * (x - 1) + y))))
    }

    edgeToNumber(edge: Edge): number {
        let indexedEdge: Edge = edge.toIndex(this.vertexToIndex)
        return this.vertices.length * indexedEdge.startVertex + indexedEdge.endVertex
    }

    numberToEdge(number: number): Edge {
        return new Edge(this.vertices[(number / this.vertices.length) >> 0], this.vertices[number % this.vertices.length])
    }

    isFull(): Boolean {
        let verticesNumber = this.vertices.length
        return this.numbers.size === (verticesNumber * (verticesNumber - 1)) / 2 && _.isEmpty(this.notInitializedNumbers)
    }

    initializeTree(): number {
        for (let i = 0; i < (this.vertices.length - 1); i += 1) {
            let edge: Edge = new Edge(this.vertices[i], this.vertices[i + 1])
            this.addEgde(edge)
        }
        return this.vertices.length - 1
    }

    addEgde(edge: Edge): void {
        let edgeNumber: number = this.edgeToNumber(edge)
        if (this.notInitializedNumbers.delete(edgeNumber)) {
            this.numbers.add(edgeNumber)
        }
    }

    hasEdge(edge: Edge): Boolean {
        let edgeNumber: number = this.edgeToNumber(edge)
        return this.numbers.has(edgeNumber) && !this.notInitializedNumbers.has(edgeNumber)
    }

    removeEdge(edge: Edge): Boolean {
        let edgeNumber: number = this.edgeToNumber(edge)
        if (this.numbers.delete(edgeNumber)) {
            this.notInitializedNumbers.add(edgeNumber)
            return true
        }
        return false
    }
    
    addNumber(number: number) {
        if (this.notInitializedNumbers.delete(number)) {
            this.numbers.add(number)
        }
    }
    
    deleteNumber(number: number) {
        if (this.numbers.delete(number)) {
            this.notInitializedNumbers.add(number)
        }
    }

    getEdges(): Array<Edge> {
        return Array.from(this.numbers).map((x) => this.numberToEdge(x))
    }

    getNotInitializedEdges(): Array<Edge> {
        return Array.from(this.notInitializedNumbers).map((x) => this.numberToEdge(x))
    }

    addRandomEdge(): void {
        let randomEgdeNumber: number | undefined = _.sample(Array.from(this.notInitializedNumbers))
        if (randomEgdeNumber && randomEgdeNumber >= 0) {
            this.addNumber(randomEgdeNumber)
        }
    }

    addRandomEdgesSize(size: number): void {
       _.forEach(_.sampleSize(Array.from(this.notInitializedNumbers), size), (x) => this.addNumber(x))
    }
}

export default GraphManager