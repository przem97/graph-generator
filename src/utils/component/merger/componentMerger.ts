import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import IComponentMerger from "./componentMerger.interface";
import SetBasedComponentManager from "../manager/setBasedComponentManager";

export default class ComponentMerger implements IComponentMerger {
    merge(component1: Component, component2: Component, edge: Edge): Component {
        if (this.canBeMergedByEdge(component1, component2, edge)) {
            const totalEdges: Edge[] = [ ...component1.edges, ...component2.edges, edge ];
            const totalVertices: Vertex[] = [ ...component1.vertices, ...component2.vertices ];

            return new Component(totalEdges, totalVertices);
        }

        return new Component();
    }

    canBeMergedByEdge(component1: Component, component2: Component, edge: Edge): boolean {
        const componentManager1 = new SetBasedComponentManager(component1.vertices, component1.edges);
        const componentManager2 = new SetBasedComponentManager(component2.vertices, component2.edges);

        if ((componentManager1.hasVertex(new Vertex(edge.startVertex))
            && componentManager2.hasVertex(new Vertex(edge.endVertex)))
            || (componentManager2.hasVertex(new Vertex(edge.startVertex))
            && componentManager1.hasVertex(new Vertex(edge.endVertex)))) {
            return true;
        }

        return false;
    }
}