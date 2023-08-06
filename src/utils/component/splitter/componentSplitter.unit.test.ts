import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import ComponentSplitter from "./componentSplitter";

describe("split() method tests", () => {
    test('component splitter should split component into three components', () => {
        // given 
        const vertices = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3),
            new Vertex(4),
            new Vertex(5),
            new Vertex(6)
        ];
        const edges = [
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(1, 2),
            new Edge(3, 4),
            new Edge(5, 6)
        ];
        const component = new Component(edges, vertices);
        
        // when
        const components: Component[] = new ComponentSplitter().split(component);
        
        // then
        expect(components.length).toBe(3);
    });


    test('component splitter should split component into six components', () => {
        // given 
        const vertices = [
            new Vertex(0),
            new Vertex(133333),
            new Vertex(23),
            new Vertex(33),
            new Vertex(42),
            new Vertex(51),
            new Vertex(67)
        ];
        const edges = [
            new Edge(23, 67)
        ];
        const component = new Component(edges, vertices);
        
        // when
        const components: Component[] = new ComponentSplitter().split(component);
        
        // then
        expect(components.length).toBe(6);
    });

    test('component splitter should not split component, instad create a copy of existing tree', () => {
        // given 
        const vertices = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3)
        ];
        const edges = [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
        ];
        const component = new Component(edges, vertices);

        // when
        const components: Component[] = new ComponentSplitter().split(component);

        // then
        expect(components.length).toBe(1);
        expect(components[0]).not.toBeUndefined();
        expect(components[0]).not.toBeFalsy();
        expect(components[0].vertices.length).toEqual(4);
        expect(components[0].edges.length).toEqual(3);
    });

    test('component splitter should not split component, instad create a copy of existing full graph', () => {
        // given 
        const vertices = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3)
        ];
        const edges = [
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(0, 3),
            new Edge(1, 2),
            new Edge(1, 3),
            new Edge(2, 3)
        ];
        const component = new Component(edges, vertices);

        // when
        const components: Component[] = new ComponentSplitter().split(component);

        // then
        expect(components.length).toBe(1);
        expect(components[0]).not.toBeUndefined();
        expect(components[0]).not.toBeFalsy();
        expect(components[0].vertices.length).toEqual(4);
        expect(components[0].edges.length).toEqual(6);
    })

    test('component splitter should not split empty component', () => {
        // given 
        const vertices: Vertex[] = [];
        const edges: Edge[] = [];
        const component: Component = new Component(edges, vertices);
        
        // when
        const components: Component[] = new ComponentSplitter().split(component);

        // then
        expect(components.length).toBe(0);
    });

    test('component splitter create exact copy of component with one vertex', () => {
        // given 
        const vertices = [new Vertex(0)];
        const edges: Edge[] = [];
        const component = new Component(edges, vertices);

        // when
        const components: Component[] = new ComponentSplitter().split(component);

        // then
        expect(components.length).toBe(1);
        expect(components[0]).not.toBeUndefined();
        expect(components[0]).not.toBeFalsy();
        expect(components[0].vertices.length).toEqual(1);
        expect(components[0].edges.length).toEqual(0);
    });

    test('component splitter should split into two components', () => {
        // given 
        const vertices = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3)
        ];
        const edges = [
            new Edge(0, 1),
            new Edge(2, 3)
        ]
        const component = new Component(edges, vertices);
        
        // when
        const components: Component[] = new ComponentSplitter().split(component);

        // then
        expect(components.length).toBe(2);
        for (const component of components) {
            expect(component).not.toBeUndefined();
            expect(component).not.toBeFalsy();
            expect(component.vertices.length).toEqual(2);
            expect(component.edges.length).toEqual(1);
        }
    });

    test('component component splitter should split and preserve edge weights', () => {
        // given 
        const vertices = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3)
        ];
        const edges = [
            new Edge(0, 1, 1.23333),
            new Edge(2, 3, 250.22)
        ];
        const component = new Component(edges, vertices);
        
        // when
        const components: Component[] = new ComponentSplitter().split(component);

        // then
        expect(components.length).toBe(2);
        for (const component of components) {
            expect(component).not.toBeUndefined();
            expect(component).not.toBeFalsy();
            expect(component.edges).not.toBeUndefined();
            expect(component.edges).not.toBeFalsy();
            expect(component.edges.length).toEqual(1);
            if (component.edges[0].startVertex === 0 && component.edges[0].endVertex === 1) {
                expect(component.edges[0].weight).toBeCloseTo(1.23333);
            } else if (component.edges[0].startVertex === 2 && component.edges[0].endVertex === 3) {
                expect(component.edges[0].weight).toBeCloseTo(250.22);
            }
        }
    });
});