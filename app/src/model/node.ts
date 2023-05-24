export type NodeType = {
    x: number,
    y: number
}

export default class Node {
    static create(x: number, y: number): NodeType {
        return {
            x: x,
            y: y
        }
    }
}