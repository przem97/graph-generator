import * as _ from 'lodash';
import Component from '../../../models/component';
import IEdgeInitializer from '../edge/edgeInitializer.interface';
import IGraphInitializer from './graphInitializer.interface';
import IVertexInitializer from '../vertex/vertexInitializer.interface';
import IComponentInitializer from '../component/componentInitializer.interface';

class GraphInitializer implements IGraphInitializer {
    readonly componentInitializer: IComponentInitializer;
    readonly edgeInitializer: IEdgeInitializer;
    readonly vertexInitializer: IVertexInitializer;

    constructor(
        componentInitializer: IComponentInitializer,
        edgeInitializer: IEdgeInitializer,
        vertexInitializer: IVertexInitializer
    ) {
        this.componentInitializer = componentInitializer;
        this.edgeInitializer = edgeInitializer;
        this.vertexInitializer = vertexInitializer;
    }

    initializeGraph(): Array<Component> { 
        let components = this.componentInitializer.initializeComponents();
        this.vertexInitializer.initializeVertices(components);
        this.edgeInitializer.initializeEdges(components)
        this.edgeInitializer.initializeWeights(components);
        return components;
    }
}


export default GraphInitializer