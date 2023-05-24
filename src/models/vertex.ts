class Vertex {
    ordinal: number;
    x: number;
    y: number;

    constructor(ordinal: number, x: number = 0, y: number = 0) {
        this.ordinal = ordinal;
        this.x = x;
        this.y = y;
    }
}

export default Vertex;