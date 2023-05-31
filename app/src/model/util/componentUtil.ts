import { ComponentType } from "../component";
import * as _ from "lodash";
import { NodeType } from "../node";

export class ComponentUtils {
    static getNextNodeOrdinal(components: ComponentType[]): number {
        let maxOrdinal = 0;

        for (let component of components) {
            let foundNode: NodeType | undefined = _.maxBy(component.nodes, (node: NodeType) => node.ordinal);
            if (foundNode && foundNode.ordinal > maxOrdinal) {
                maxOrdinal = foundNode.ordinal;
            }
        }

        return maxOrdinal + 1;
    }
}