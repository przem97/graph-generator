import Component from "../../../models/component";

export default interface IEdgeInitializer {
    initializeEdges(components: Component[]): void;
    initializeWeights(components: Component[]): void;
}