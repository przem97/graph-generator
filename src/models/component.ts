import Edge from "./edge";

class Component {
    edges: Array<Edge>;
    vertices: Array<number>;
    edgesNumber: number;

    constructor() {
        this.edges = []
        this.vertices = []
        this.edgesNumber = 0
    }
}

export default Component