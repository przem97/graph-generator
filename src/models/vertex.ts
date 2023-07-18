class Vertex {
    readonly ordinal: number;
    readonly x: number;
    readonly y: number;

    constructor(ordinal: number, x: number = 0, y: number = 0) {
        this.ordinal = ordinal;
        this.x = x;
        this.y = y;
    }
}

export default Vertex;