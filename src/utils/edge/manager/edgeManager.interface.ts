import Edge from "../../../models/edge";
import Component from "../../../models/component";

interface IEdgeManager {
    addEdge(components: Component[], edge: Edge): Component[];
}

export default IEdgeManager;