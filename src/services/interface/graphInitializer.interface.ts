import Component from '../../models/component'

export default interface IGraphInitializer {
    initializeGraph(totalVertices: number, totalEdges: number, totalComponents: number): Array<Component>;
    initializeComponents(totalComponents: number): Array<Component>;
    initializeVertices(components: Array<Component>, totalVertices: number): Array<Component>;
    initializeEdges(components: Array<Component>, totalEdges: number): Array<Component>;
    initializeWeights(components: Array<Component>): Array<Component>;
}