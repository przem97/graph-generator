import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import IComponentManager from "../manager/componentManager.interface";
import SetBasedComponentManager from "../manager/setBasedComponentManager";
import ComponentMerger from "./componentMerger";

describe('merge() method tests', () => {
    let component1: Component;
    let component2: Component;

    beforeEach(() => {
        const vertices1 = [
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
        ];
        const vertices2 = [
            new Vertex(10),
            new Vertex(11),
            new Vertex(12),
            new Vertex(13)
        ];
        const edges1 = [
            new Edge(0, 1),
            new Edge(0, 2)
        ];
        const edges2 = [
            new Edge(10, 11),
            new Edge(11, 12),
            new Edge(12, 13)
        ];

        component1 = new Component(edges1, vertices1);
        component2 = new Component(edges2, vertices2);
    });

    it('should merge two components by connecting them with one edge', () => {
        // given  
        const mergingEdge: Edge = new Edge(0, 10);
        const merger = new ComponentMerger();

        // when
        const merged = merger.merge(component1, component2, mergingEdge);
        const manager = SetBasedComponentManager.ofComponent(merged);

        // then
        expect(merged).not.toBeUndefined();
        expect(merged).not.toBeNull();
        expect(merged.edges.length).toEqual(6);
        expect(merged.vertices.length).toEqual(7);
        expect(manager.hasEdge(mergingEdge)).toBeTruthy();

        for (const edge of component1.edges) {
            expect(manager.hasEdge(edge)).toBeTruthy();
        }
        for (const edge of component2.edges) {
            expect(manager.hasEdge(edge)).toBeTruthy();
        }
        for (const vertex of component1.vertices) {
            expect(manager.hasVertex(vertex)).toBeTruthy();
        }
        for (const vertex of component2.vertices) {
            expect(manager.hasVertex(vertex)).toBeTruthy();
        }
    });

    it('should return empty component', () => {
        // given  
        const dummyEdge: Edge = new Edge(0, 100);
        const merger = new ComponentMerger();

        // when
        const merged = merger.merge(component1, component2, dummyEdge);
        const manager = SetBasedComponentManager.ofComponent(merged);

        // then
        expect(merged).not.toBeUndefined();
        expect(merged).not.toBeNull();
        expect(merged.edges.length).toEqual(0);
        expect(merged.vertices.length).toEqual(0);
        expect(manager.hasEdge(dummyEdge)).not.toBeTruthy();

        for (const edge of component1.edges) {
            expect(manager.hasEdge(edge)).not.toBeTruthy();
        }
        for (const edge of component2.edges) {
            expect(manager.hasEdge(edge)).not.toBeTruthy();
        }
        for (const vertex of component1.vertices) {
            expect(manager.hasVertex(vertex)).not.toBeTruthy();
        }
        for (const vertex of component2.vertices) {
            expect(manager.hasVertex(vertex)).not.toBeTruthy();
        }
    });
});