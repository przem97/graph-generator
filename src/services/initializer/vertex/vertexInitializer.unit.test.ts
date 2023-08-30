import Component from '../../../models/component';
import ComponentInitializer from '../component/componentInitializer';
import IComponentInitializer from '../component/componentInitializer.interface';
import VertexInitializer from './vertexInitializer';
import IVertexInitializer from './vertexInitializer.interface';

let vertexInitializer: IVertexInitializer;
let componentInitializer: IComponentInitializer;
let components: Component[];

describe("1 component and 2 vertices", () => {
    const totalVertices: number = 2;
    const totalComponents: number = 1;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices);
    });

    it('should initialize only one component with two vertices', () => {
        // given

        // when
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);

        // then
        expect(components.length).toEqual(1);
        expect(components[0].vertices.length).toEqual(2);
    });
});

describe("5 components and 3 vertices", () => {
    const totalVertices: number = 3;
    const totalComponents: number = 5;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices);
    });

    it('should initialize 5 components each with one vertex', () => {
        // given

        // when
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);

        // then
        expect(components.length).toEqual(5);
        for (const component of components) {
            expect(component.vertices.length).toEqual(1);
        }
    });
});

describe("42 components and 0 vertices", () => {
    const totalVertices: number = 0;
    const totalComponents: number = 42;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices);
    });

    it('should initialize 42 components each with one vertex', () => {
        // given

        // when
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);

        // then
        for (const component of components) {
            expect(component.vertices.length).toEqual(1);
            expect(components.length).toEqual(42);
        }
    });
});

describe("3 components and 21 vertices", () => {
    const totalVertices: number = 21;
    const totalComponents: number = 3;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices);
    });

    it('should initialize 3 components with total of 21 vertices', () => {
        // given

        // when
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);

        // then
        expect(components.length).toEqual(3);
        expect(components.reduce((acc: number, crr: Component) => acc + crr.vertices.length, 0)).toEqual(21);
        for (const component of components) {
            expect(component.vertices.length).toBeGreaterThan(0);
        }
    });
});

describe("startId set to 94 and generate 5 components and 12 vertices", () => {
    const totalVertices: number = 12;
    const totalComponents: number = 5;
    const startId = 94;

    beforeAll(() => {
        componentInitializer = new ComponentInitializer(totalComponents);
        vertexInitializer = new VertexInitializer(totalVertices, startId);
    });

    it('should initialize 5 components with total of 12 vertices for startId set to 94', () => {
        // given

        // when
        components = componentInitializer.initializeComponents();
        vertexInitializer.initializeVertices(components);

        // then
        expect(components.length).toEqual(5);
        expect(components.reduce((acc: number, crr: Component) => acc + crr.vertices.length, 0)).toEqual(totalVertices);
        for (const component of components) {
            expect(component.vertices.length).toBeGreaterThan(0);

            for (const vertex of component.vertices) {
                expect(vertex.id).toBeGreaterThanOrEqual(startId);
            }
        }
    });
});