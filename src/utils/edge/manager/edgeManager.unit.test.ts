import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import EdgeManager from "./edgeManager";
import SetBasedComponentManager from "../../component/manager/setBasedComponentManager";

describe('addEdge() method tests', () => {
    let edges1: Edge[];
    let edges2: Edge[];
    let edges3: Edge[];
    let edges4: Edge[];
    let vertices1: Vertex[];
    let vertices2: Vertex[];
    let vertices3: Vertex[];
    let vertices4: Vertex[];
    let component1: Component;
    let component2: Component;
    let component3: Component;
    let component4: Component;

    beforeEach(() => {
        vertices1 = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
        ];
        vertices2 = [
            new Vertex(10),
            new Vertex(11)
        ];
        vertices3 = [
            new Vertex(999)
        ];
        vertices4 = [
            new Vertex(100),
            new Vertex(101),
            new Vertex(102)
        ];
        edges1 = [
            new Edge(0, 1),
            new Edge(0, 2)
        ];
        edges2 = [
            new Edge(10, 11)
        ];
        edges3 = [];
        edges4 = [
            new Edge(100, 101),
            new Edge(100, 102)
        ];

        component1 = new Component(edges1, vertices1);
        component2 = new Component(edges2, vertices2);
        component3 = new Component(edges3, vertices3);
        component4 = new Component(edges4, vertices4);
    });

    test('add one edge should merge component1 and component3', () => {
        // given  
        const mergingEdge: Edge = new Edge(1, 999);
        const merger = new EdgeManager();

        // when
        const components = merger.addEdge([component1, component2, component3, component4], mergingEdge);
        
        // then
        expect(components.length).toEqual(3);

        for (const component of components) {
            expect(component).not.toBeNull();
            expect(component).not.toBeUndefined();
            expect(component.vertices).not.toBeNull();
            expect(component.vertices).not.toBeUndefined();
            expect(component.edges).not.toBeNull();
            expect(component.edges).not.toBeUndefined();

            const manager = SetBasedComponentManager.ofComponent(component);

            if (component.vertices.length === 4) {
                expect(component.edges.length).toEqual(3);
                for (const vertex of vertices1) {
                    expect(manager.hasVertex(vertex)).toBeTruthy();
                }
                for (const vertex of vertices3) {
                    expect(manager.hasVertex(vertex)).toBeTruthy();
                }
                for (const edge of edges1) {
                    expect(manager.hasEdge(edge)).toBeTruthy();
                }
                for (const edge of edges3) {
                    expect(manager.hasEdge(edge)).toBeTruthy();
                }
            } else if (component.vertices.length === 3) {
                expect(component.edges.length).toEqual(2);                
                for (const vertex of vertices4) {
                    expect(manager.hasVertex(vertex)).toBeTruthy();
                }
                for (const edge of edges4) {
                    expect(manager.hasEdge(edge)).toBeTruthy();
                }
            } else if (component.vertices.length === 2) {
                expect(component.edges.length).toEqual(1);              
                for (const vertex of vertices2) {
                    expect(manager.hasVertex(vertex)).toBeTruthy();
                }
                for (const edge of edges2) {
                    expect(manager.hasEdge(edge)).toBeTruthy();
                }
            }
        }
    });

    it('should not create new component', () => {
        // given  
        const mergingEdge: Edge = new Edge(1, 9);
        const merger = new EdgeManager();

        // when
        const components = merger.addEdge([component1, component3], mergingEdge);
        
        // then
        expect(components.length).toEqual(2);
    });
});