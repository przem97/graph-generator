import Edge from "./edge";
import Vertex from "./vertex";

class Component {
    edges: Array<Edge>;
    vertices: Array<Vertex>;
    edgesNumber: number;

    constructor() {
        this.edges = []
        this.vertices = []
        this.edgesNumber = 0
    }
}

export default Component