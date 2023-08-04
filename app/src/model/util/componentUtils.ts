import Component, { ComponentType } from "../component";
import * as _ from "lodash";
import Node, { NodeType } from "../node";
import { EdgeType } from "../edge";

export class ComponentUtils {
    static getNextNodeOrdinal(components: ComponentType[]): number {
        let maxOrdinal = 0;

        for (let component of components) {
            let foundNode: NodeType | undefined = _.maxBy(component.vertices, (node: NodeType) => node.ordinal);
            if (foundNode && foundNode.ordinal > maxOrdinal) {
                maxOrdinal = foundNode.ordinal;
            }
        }

        return maxOrdinal + 1;
    }

    static findOrdinal(node: NodeType, components: ComponentType[]): number {
        // traverse all the components
        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            for (let j = 0; j < component.vertices.length; j++) {
                const currentNode = component.vertices[j];

                if (Node.intersect(currentNode, node)) {
                    return currentNode.ordinal;
                }
            }
        }

        return -1;
    }

    static mergeComponents(first: ComponentType, second: ComponentType): ComponentType {
        const firstEdgesClone: EdgeType[] = _.cloneDeep(first.edges);
        const secondEdgesClone: EdgeType[] = _.cloneDeep(second.edges);
        const firstNodesClone: NodeType[] = _.cloneDeep(first.vertices);
        const secondNodesClone: NodeType[] = _.cloneDeep(second.vertices);

        return Component.create([...firstNodesClone, ...secondNodesClone], [...firstEdgesClone, ...secondEdgesClone]);
    }
}