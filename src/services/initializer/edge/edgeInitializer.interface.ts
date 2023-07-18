import Component from "../../../models/component";

export default interface IEdgeInitializer {
    initializeEdges(components: Component[]): Component[];
    initializeWeights(components: Component[]): Component[];
}