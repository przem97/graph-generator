import Component from "../../../models/component";

export default interface IVertexInitializer {
    initializeVertices(components: Component[]): void;
}