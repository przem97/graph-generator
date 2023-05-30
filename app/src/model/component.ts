import { NodeType } from "./node";
import { EdgeType } from "./edge";

export type ComponentType = {
  nodes: NodeType[],
  edges: EdgeType[]
}

export default class Component {
  static create(nodes: NodeType[], edges: EdgeType[]): ComponentType {
      return {
          nodes: nodes,
          edges: edges
      }
  }
}