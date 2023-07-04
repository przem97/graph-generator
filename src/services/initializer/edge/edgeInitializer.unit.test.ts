import Component from "../../../models/component";
import ComponentInitializer from "../component/componentInitializer";
import IComponentInitializer from "../component/componentInitializer.interface";
import VertexInitializer from "../vertex/vertexInitializer";
import IVertexInitializer from "../vertex/vertexInitializer.interface";
import EdgeInitializer from "./edgeInitializer";
import IEdgeInitializer from "./edgeInitializer.interface";

let edgeInitializer: IEdgeInitializer;
let vertexInitializer: IVertexInitializer;
let componentInitializer: IComponentInitializer;
let components: Component[];

describe("1 component, 2 vertices and 1 edge scenario", () => {
    const totalEdges: number = 1;
    const totalVertices: number = 2;
    const totalComponents: number = 1;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices);
    });
    
    beforeEach(() => {
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);
    });
    
    it('should initialize one edge', () => {
        // given
        edgeInitializer = new EdgeInitializer(totalEdges, 0, 0);

        // when
        edgeInitializer.initializeEdges(components);

        // then
        expect(components[0].edges.length).toEqual(1);
    });
    
    it('should initialize edge weight between 2 and 3', () => {
        // given
        const edgeWeightLowerBound: number = 2;
        const edgeWeightUpperBound: number = 3;

        edgeInitializer = new EdgeInitializer(totalEdges,
            edgeWeightLowerBound,
            edgeWeightUpperBound);

        // when
        edgeInitializer.initializeEdges(components);
        edgeInitializer.initializeWeights(components)
        const weight = components[0].edges[0].weight; 

        // then
        expect(weight).toBeGreaterThanOrEqual(2);
        expect(weight).toBeLessThanOrEqual(3);
    });

    it('should initialize edge weight between -15 and -4', () => {
        // given
        const edgeWeightLowerBound: number = -15;
        const edgeWeightUpperBound: number = -4;

        edgeInitializer = new EdgeInitializer(totalEdges,
            edgeWeightLowerBound,
            edgeWeightUpperBound);

        // when
        edgeInitializer.initializeEdges(components);
        edgeInitializer.initializeWeights(components)
        const weight = components[0].edges[0].weight; 

        // then
        expect(weight).toBeGreaterThanOrEqual(-15);
        expect(weight).toBeLessThanOrEqual(-4);
    });
})


describe("1 component, 8 vertices and 12 edges scenario", () => {
    const totalEdges: number = 12;
    const totalVertices: number = 8;
    const totalComponents: number = 1;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices);
    });
    
    beforeEach(() => {
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);
    });
    
    it('should initialize 12 edges', () => {
        // given
        edgeInitializer = new EdgeInitializer(totalEdges, 0, 0);

        // when
        edgeInitializer.initializeEdges(components);

        // then
        expect(components[0].edges.length).toEqual(12);
    });
    
    it('should initialize all edges weight between -1 and 8', () => {
        // given
        const edgeWeightLowerBound: number = -1;
        const edgeWeightUpperBound: number = 8;

        edgeInitializer = new EdgeInitializer(totalEdges,
            edgeWeightLowerBound,
            edgeWeightUpperBound);

        // when
        edgeInitializer.initializeEdges(components);
        edgeInitializer.initializeWeights(components)
        // then
        for (let i = 0; i < components[0].edges.length; i++) {
            const weight = components[0].edges[i].weight; 
    
            expect(weight).toBeGreaterThanOrEqual(-1);
            expect(weight).toBeLessThanOrEqual(8);
        }
    });
})
