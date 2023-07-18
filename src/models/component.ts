import Edge from "./edge";
import Vertex from "./vertex";

class Component {
    readonly edges: Array<Edge>;
    readonly vertices: Array<Vertex>;

    constructor(edges: Edge[] = [], vertices: Vertex[] = []) {
        this.edges = edges;
        this.vertices = vertices;
    }
}

export default Component