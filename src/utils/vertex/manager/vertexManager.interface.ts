import Vertex from "../../../models/vertex";
import Component from "../../../models/component";

interface IVertexManager {
    removeVertex(components: Component[], vertex: Vertex): Component[];
}

export default IVertexManager;