export type EdgeType = {
    startVertex: number,
    endVertex: number,
    weight: number
}

export default class Edge {
    static create(startVertex: number, endVertex: number, weight: number): EdgeType {
        return {
            startVertex: startVertex,
            endVertex: endVertex,
            weight: weight
        }
    }
}