import Component from '../../models/component'

export default interface IGraphInitializer {
    initializeGraph(totalVertices: number, totalEdges: number, totalComponents: number): Array<Component>;
}