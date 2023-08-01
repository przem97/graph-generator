import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import IVertexInitializer from "./vertexInitializer.interface"

export default class VertexInitializer implements IVertexInitializer {
    readonly totalVertices: number;
    readonly startOrdinal: number;

    constructor(totalVertices: number, startOrdinal: number = 0) {
        this.totalVertices = totalVertices;
        this.startOrdinal = startOrdinal;
    }

    initializeVertices(components: Component[]): void {
        // populate one vertex per component
        for (let i = 0; i < components.length; i += 1) {
            components[i].vertices.push(new Vertex(this.startOrdinal + i));
        }

        // fill components randomly with vertices
        for (let i = components.length; i < this.totalVertices; i += 1) {
            let componentIndex = Math.floor(Math.random() * components.length)
            components[componentIndex].vertices.push(new Vertex(this.startOrdinal + i))
        }
    }
}