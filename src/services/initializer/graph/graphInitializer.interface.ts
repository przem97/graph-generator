import Component from '../../../models/component'
import IEdgeInitializer from '../edge/edgeInitializer.interface';
import IVertexInitializer from '../vertex/vertexInitializer.interface';
import IComponentInitializer from '../component/componentInitializer.interface';

export default interface IGraphInitializer {
    readonly componentInitializer: IComponentInitializer;
    readonly edgeInitializer: IEdgeInitializer;
    readonly vertexInitializer: IVertexInitializer;

    initializeGraph(): Array<Component>;
}