import CoordinatesInitializer from '../coordinatesInitializer';
import ICoordinatesInitializer from '../interface/coordinatesInitializer.interface';
import GraphInitializer from '../../graph/graphInitializer';
import IGraphInitializer from '../../graph/interface/graphInitializer.interface';
import Component from '../../../../models/component';

const totalVertices = 10;
const totalEdges = 40;
const totalComponents = 1;
const edgeWeightLowerBound = 1;
const edgeWeightUpperBound = 3;

let graphInitializer: IGraphInitializer; 
let components: Component[];

beforeAll(() => {
    // initialize components
    graphInitializer = new GraphInitializer(
        totalVertices,
        totalEdges,
        totalComponents,
        edgeWeightLowerBound,
        edgeWeightUpperBound
    );
});

describe('should initialize x and y coordinates in specified range - Scenario 1', () => {
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