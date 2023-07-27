import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import IVertexManager from "./vertexManager.interface";
import SetBasedComponentManager from "../../component/manager/setBasedComponentManager";
import Edge from "../../../models/edge";
import ComponentSplitter from "../../component/splitter/componentSplitter";

class VertexManager implements IVertexManager {
    removeVertex(components: Component[], vertex: Vertex): Component[] {
        const resultComponents: Component[] = [];
        for (const component of components) {
            const manager = SetBasedComponentManager.ofComponent(component);
            if (manager.hasVertex(vertex)) {
                const newVertices: Vertex[] = [];
                const newEdges: Edge[] = [];

                for (const v of manager.getVertices()) {
                    if (v.ordinal !== vertex.ordinal) {
                        newVertices.push(v);
                    }
                }
                for (const edge of manager.getEdges()) {
                    if (!edge.hasVertex(vertex)) {
                        newEdges.push(edge);
                    }
                }

                const newComponent = new Component(newEdges, newVertices);
                
                const splitter = new ComponentSplitter();
                const splitted: Component[] = splitter.split(newComponent);
                
                splitted.forEach(c => resultComponents.push(c));
            } else {
                resultComponents.push(component);
            }
        }

        return resultComponents;
    }
}

export default VertexManager