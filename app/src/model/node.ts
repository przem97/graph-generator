export type NodeType = {
    ordinal: number;
    x: number,
    y: number
}

export default class Node {
    static create(x: number, y: number, ordinal: number = -1): NodeType {
        return {
            x: x,
            y: y,
            ordinal: ordinal
        }
    }
}