import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import VertexManager from "./vertexManager";

describe('removeVertex() method tests', () => {
    let vertices1: Vertex[];
    let vertices2: Vertex[];
    let edges1: Edge[];
    let edges2: Edge[];
    let component1: Component;
    let component2: Component;

    beforeEach(() => {
        vertices1 = [
            new Vertex(100),
            new Vertex(200),
            new Vertex(300),
            new Vertex(400),
            new Vertex(500)
        ];
        vertices2 = [ new Vertex(1) ];

        edges1 = [
            new Edge(100, 200),
            new Edge(200, 300),
            new Edge(300, 400),
            new Edge(400, 500)
        ];
        edges2 = [];

        component1 = new Component(edges1, vertices1);
        component2 = new Component(edges2, vertices2);
    });

    it('should remove vertex and should split component', () => {
        // given
        const vertexToRemove = new Vertex(200);
        const vertexManager = new VertexManager();

        // when
        const resultComponents = vertexManager.removeVertex([component1], vertexToRemove);

        // then
        expect(resultComponents.length).toEqual(2);
        
        for (const component of resultComponents) {
            if (component.vertices.length === 1) {
                expect(component.vertices[0].id).toEqual(100);
                expect(component.edges.length).toEqual(0);
            } else if (component.vertices.length === 3) {
                expect(component.edges.length).toEqual(2);
                let resultIds = component.vertices.map(v => v.id);

                expect(resultIds).toContain(300);
                expect(resultIds).toContain(400);
                expect(resultIds).toContain(500);
            }
        }
    });

    it('should remove whole component with one vertex', () => {
        // given
        const vertexToRemove = new Vertex(1);
        const vertexManager = new VertexManager();

        // when
        const resultComponents = vertexManager.removeVertex([component1, component2], vertexToRemove);

        // then
        expect(resultComponents.length).toEqual(1);
        expect(resultComponents[0].vertices.length).toEqual(5);
        expect(resultComponents[0].edges.length).toEqual(4)
        let resultIds = resultComponents[0].vertices.map(v => v.id);

        expect(resultIds).toContain(100);
        expect(resultIds).toContain(200);
        expect(resultIds).toContain(300);
        expect(resultIds).toContain(400);
        expect(resultIds).toContain(500);
    });
});