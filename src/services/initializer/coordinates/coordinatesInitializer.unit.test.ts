import CoordinatesInitializer from './coordinatesInitializer';
import ICoordinatesInitializer from './coordinatesInitializer.interface';
import GraphInitializer from '../graph/graphInitializer';
import IGraphInitializer from '../graph/graphInitializer.interface';
import Component from '../../../models/component';
import ComponentInitializer from '../component/componentInitializer';
import EdgeInitializer from '../edge/edgeInitializer';
import VertexInitializer from '../vertex/vertexInitializer';

const totalVertices = 10;
const totalEdges = 40;
const totalComponents = 1;
const edgeWeightLowerBound = 1;
const edgeWeightUpperBound = 3;

let graphInitializer: IGraphInitializer; 
let components: Component[];

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

describe('should initialize x between 2 and 3 and y between 0 an 9', () => {
    let testee: ICoordinatesInitializer;

    beforeAll(() => {
        components = graphInitializer.initializeGraph();
        testee = new CoordinatesInitializer(2, 3, 0, 9);
        testee.initializeCoordinates(components);
    });

    test('should initialize x coordinates between 2 and 3', () => {
        for (const component of components) {
            for (const vertex of component.vertices) {
                expect(vertex.x).toBeGreaterThanOrEqual(2);
                expect(vertex.x).toBeLessThanOrEqual(3);
            }
        }
    });

    test('should initialize y coordinates between 0 and 9', () => {
        for (const component of components) {
            for (const vertex of component.vertices) {
                expect(vertex.y).toBeGreaterThanOrEqual(0);
                expect(vertex.y).toBeLessThanOrEqual(9);
            }
        }
    });
});


describe('should initialize x between -3 and 2 and y between -4 an 19', () => {
    let testee: ICoordinatesInitializer;

    beforeAll(() => {
        components = graphInitializer.initializeGraph();
        testee = new CoordinatesInitializer(2, -3, 19, -4);
        testee.initializeCoordinates(components);
    });

    test('should initialize x coordinates between -3 and 2', () => {
        for (const component of components) {
            for (const vertex of component.vertices) {
                expect(vertex.x).toBeGreaterThanOrEqual(-3);
                expect(vertex.x).toBeLessThanOrEqual(2);
            }
        }
    });

    test('should initialize y coordinates between -4 and 19', () => {
        for (const component of components) {
            for (const vertex of component.vertices) {
                expect(vertex.y).toBeGreaterThanOrEqual(-4);
                expect(vertex.y).toBeLessThanOrEqual(19);
            }
        }
    });
});
