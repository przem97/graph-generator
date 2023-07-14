import Edge from "./edge";
import Vertex from "./vertex";

class Component {
    edges: Array<Edge>;
    vertices: Array<Vertex>;

    constructor() {
        this.edges = [];
        this.vertices = [];
    }
}

export default Component