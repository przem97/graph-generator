import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";

export default interface IComponentManager {
    isFull(): Boolean;
    initializeTree(): number;
    addEdge(edge: Edge): void;
    hasEdge(edge: Edge): Boolean;
    hasVertex(vertex: Vertex): Boolean;
    getEdgeWeight(edge: Edge): number | null;
    removeEdge(edge: Edge): Boolean;
    getEdges(): Array<Edge>;
    getVertices(): Array<Vertex>;
    addRandomEdge(): void;
    addRandomEdgesSize(size: number): void;
}