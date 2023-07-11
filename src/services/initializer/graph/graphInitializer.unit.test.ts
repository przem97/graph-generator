import GraphInitializer from '../graph/graphInitializer';
import IGraphInitializer from '../graph/graphInitializer.interface';
import Component from '../../../models/component';
import ComponentInitializer from '../component/componentInitializer';
import EdgeInitializer from '../edge/edgeInitializer';
import VertexInitializer from '../vertex/vertexInitializer';

describe('should initialize 10 components, 14 edges and 13 vertices', () => {
    const totalVertices = 13;
    const totalEdges = 14;
    const totalComponents = 10;
    const edgeWeightLowerBound = 1;
    const edgeWeightUpperBound = 3;

    let graphInitializer: IGraphInitializer;

    beforeAll(() => {
        // initialize components
        let componentInitializer = new ComponentInitializer(totalComponents);
        let edgeInitializer = new EdgeInitializer(totalEdges, edgeWeightLowerBound, edgeWeightUpperBound);
        let vertexInitializer = new VertexInitializer(totalVertices);

        graphInitializer = new GraphInitializer(
            componentInitializer,
            edgeInitializer,
            vertexInitializer
        );
    });

    it('should initialize 10 components', () => {
        // given

        // when
        let components: Component[] = graphInitializer.initializeGraph();

        // then
        expect(components.length).toEqual(10);
    });

    it('should initialize 14 edges', () => {
        // given

        // when
        let components: Component[] = graphInitializer.initializeGraph();

        // then
        expect(components.reduce((acc: number, crr: Component) => acc + crr.edges.length, 0)).toBeGreaterThanOrEqual(3);
    });

    it('should initialize 13 vertices', () => {
        // given

        // when
        let components: Component[] = graphInitializer.initializeGraph();

        // then
        for (const component of components) {
            expect(component.vertices.length).toBeGreaterThan(0);
        }
        expect(components.reduce((acc: number, crr: Component) => acc + crr.vertices.length, 0)).toEqual(13);
    });
});


describe('should initialize 3 empty components, each with 1 vertex', () => {
    const totalVertices = 0;
    const totalEdges = 0;
    const totalComponents = 3;
    const edgeWeightLowerBound = 1;
    const edgeWeightUpperBound = 3;

    let graphInitializer: IGraphInitializer;

    beforeAll(() => {
        // initialize components
        let componentInitializer = new ComponentInitializer(totalComponents);
        let edgeInitializer = new EdgeInitializer(totalEdges, edgeWeightLowerBound, edgeWeightUpperBound);
        let vertexInitializer = new VertexInitializer(totalVertices);

        graphInitializer = new GraphInitializer(
            componentInitializer,
            edgeInitializer,
            vertexInitializer
        );
    });

    it('should initialize 3 components', () => {
        // given

        // when
        let components: Component[] = graphInitializer.initializeGraph();

        // then
        expect(components.length).toEqual(3);
    });

    it('should initialize 0 edges', () => {
        // given

        // when
        let components: Component[] = graphInitializer.initializeGraph();

        // then
        for (const component of components) {
            expect(component.edges.length).toEqual(0);
        }
    });

    it('should initialize 3 vertices', () => {
        // given

        // when
        let components: Component[] = graphInitializer.initializeGraph();

        // then
        for (const component of components) {
            expect(component.vertices.length).toEqual(1);
        }
    });
});