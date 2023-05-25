import Edge from "../models/edge";

export default interface IGraphManager {
    isFull(): Boolean;
    initializeTree(): number;
    addEgde(edge: Edge): void;
    hasEdge(edge: Edge): Boolean;
    removeEdge(edge: Edge): Boolean;
    getEdges(): Array<Edge>;
    addRandomEdge(): void;
    addRandomEdgesSize(size: number): void;
}