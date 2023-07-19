import _ from "lodash";
import { Dictionary } from "lodash";
import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import IComponentManager from "./componentManager.interface"

/**
 * Utility class which provides basic operaions on graph like adding/removing edges and tree initialization
 */
class SetBasedComponentManager implements IComponentManager {
    readonly vertices: Array<Vertex>;
    readonly vertexToIndex: Map<number, number>;
    /**
     * enumerates initialized edges
     */
    readonly numbers: Set<number>;
    /**
     * enumerates not initialized edges
     */
    readonly notInitializedNumbers: Set<number>;
    readonly edgeWeight: Map<number, number>;

    /**
     * The graph is represented by a two sets where the inspiration was took from matrix representation of graph edges, namely,
     * the two sets 'numbers' and 'notInitializedNumbers' are holding every number of edge, since we operate on undirected graph the 
     * numbers which represents edges comes from the upper triangle over the diagonal of matrix-represented graph. The given vertices
     * are not required to be consecutive numbers (when sorted) since mapping between vertex and specific index is performed.
     * @param {Array.<number>} vertices - The list of vertices
     */
    constructor(vertices: Array<Vertex>, edges: Edge[] = []) {
        this.vertices = vertices
        this.vertexToIndex = new Map<number, number>();
        
        for (let i = 0; i < this.vertices.length; i += 1) {
            this.vertexToIndex.set(this.vertices[i].ordinal, i);
        }

        this.numbers = new Set();

        if (vertices.length > 0 ) {
            this.notInitializedNumbers = new Set(_.flatMap(_.range(1, this.vertices.length).map((x) => _.range(x, this.vertices.length).map((y) => this.vertices.length * (x - 1) + y))))
        } else {
            this.notInitializedNumbers = new Set();
        }

        this.edgeWeight = new Map();

        for (let i = 0; i < edges.length; i++) { 
            this.addEdge(new Edge(edges[i].startVertex, edges[i].endVertex, edges[i].weight));
        }
    }

    static ofComponent(component: Component): SetBasedComponentManager {
        return new SetBasedComponentManager(component.vertices, component.edges);
    }

    getComponent(): Component {
        return new Component(this.getEdges(), this.getVertices());
    }

    edgeToNumber(edge: Edge): number {
        let indexedEdge: Edge = edge.toIndex(this.vertexToIndex)
        return this.vertices.length * indexedEdge.startVertex + indexedEdge.endVertex
    }

    numberToEdge(number: number): Edge {
        const startVertex = this.vertices[(number / this.vertices.length) >> 0].ordinal;
        const endVertex = this.vertices[number % this.vertices.length].ordinal;
        const weight = this.edgeWeight.get(number);
        return new Edge(startVertex, endVertex, weight);
    }

    isFull(): Boolean {
        let verticesNumber = this.vertices.length
        return this.numbers.size === (verticesNumber * (verticesNumber - 1)) / 2 && _.isEmpty(this.notInitializedNumbers)
    }

    initializeTree(): number {
        for (let i = 0; i < (this.vertices.length - 1); i += 1) {
            let edge: Edge = new Edge(this.vertices[i].ordinal, this.vertices[i + 1].ordinal)
            this.addEdge(edge)
        }
        return this.vertices.length - 1
    }

    addEdge(edge: Edge): Boolean {
        let edgeNumber: number = this.edgeToNumber(edge);
        if (this.notInitializedNumbers.delete(edgeNumber)) {
            this.numbers.add(edgeNumber);
            this.edgeWeight.set(edgeNumber, edge.weight);
            return true;
        }
        return false;
    }

    getEdgeWeight(edge: Edge): number | null {
        if (this.hasEdge(edge)) {
            const weight = this.edgeWeight.get(this.edgeToNumber(edge));
            if (weight) {
                return weight;
            }
        }
        return null;
    }

    hasEdge(edge: Edge): Boolean {
        let edgeNumber: number = this.edgeToNumber(edge)
        return this.numbers.has(edgeNumber) && !this.notInitializedNumbers.has(edgeNumber)
    }

    hasVertex(vertex: Vertex): Boolean {
        return this.vertexToIndex.has(vertex.ordinal);
    }

    removeEdge(edge: Edge): Boolean {
        let edgeNumber: number = this.edgeToNumber(edge)
        if (this.numbers.delete(edgeNumber)) {
            this.notInitializedNumbers.add(edgeNumber)
            this.edgeWeight.delete(edgeNumber);
            return true
        }
        return false
    }
    
    addNumber(number: number) {
        if (this.notInitializedNumbers.delete(number)) {
            this.numbers.add(number)
            this.edgeWeight.set(number, 0);
        }
    }
    
    deleteNumber(number: number) {
        if (this.numbers.delete(number)) {
            this.notInitializedNumbers.add(number);
            this.edgeWeight.delete(number);
        }
    }

    getEdges(): Array<Edge> {
        return Array.from(this.numbers).map((x) => this.numberToEdge(x))
    }

    getVertices(): Vertex[] {
        return this.vertices;
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

export default SetBasedComponentManager;