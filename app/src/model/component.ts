import Node, { NodeType } from "./node";
import Edge, { EdgeType } from "./edge";
import { AxiosResponse } from "axios";

export type ComponentType = {
  vertices: NodeType[],
  edges: EdgeType[]
}

export default class Component {
  static create(vertices: NodeType[], edges: EdgeType[]): ComponentType {
      return {
          vertices: vertices,
          edges: edges
      }
  }

  static fromResponse(response: AxiosResponse): ComponentType[] {
    let components = response.data.graph.components;
    let newComponents: ComponentType[] = [];
    for (let i = 0; i < components.length; i++) {
        let component = components[i];
        const edges: EdgeType[] = [];

        for (let j = 0; j < component.edges.length; j++) {
            let edge = component.edges[j];
            edges.push(Edge.create(edge.startVertex, edge.endVertex, edge.weight));
        }

        const nodes: NodeType[] = [];
        for (let j = 0; j < component.vertices.length; j++) {
            let node = component.vertices[j];
            nodes.push(Node.create(node.x, node.y, node.ordinal));
        }

        newComponents.push(Component.create(nodes, edges));
    }

    return newComponents;
  }
}