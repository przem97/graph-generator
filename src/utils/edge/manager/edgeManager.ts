import Edge from "../../../models/edge";
import Vertex from "../../../models/vertex";
import Component from "../../../models/component";
import ComponentMerger from "../../component/merger/componentMerger";
import IEdgeManager from "./edgeManager.interface";
import IComponentManager from "../../component/manager/componentManager.interface";
import SetBasedComponentManager from "../../component/manager/setBasedComponentManager";
import ComponentSplitter from "../../component/splitter/componentSplitter";

class EdgeManager implements IEdgeManager {
    addEdge(components: Component[], edge: Edge): Component[] {
        const componentManagers: IComponentManager[] = [];

        for (let i = 0; i < components.length; i++) {
            componentManagers.push(SetBasedComponentManager.ofComponent(components[i]))
        }

        let firstComponentIdx: number = -1;
        let secondComponentIdx: number = -1;

        for (let i = 0; i < componentManagers.length; i++) {
            if (componentManagers[i].hasVertex(new Vertex(edge.startVertex))
                && componentManagers[i].hasVertex(new Vertex(edge.endVertex))) {
                componentManagers[i].addEdge(edge);
                break;
            } else if (componentManagers[i].hasVertex(new Vertex(edge.startVertex))) {
                firstComponentIdx = i;
            } else if (componentManagers[i].hasVertex(new Vertex(edge.endVertex))) {
                secondComponentIdx = i;
            }

            if (firstComponentIdx >= 0 && secondComponentIdx >= 0) {
                const newComponent = new ComponentMerger().merge(componentManagers[firstComponentIdx].getComponent(),
                    componentManagers[secondComponentIdx].getComponent(), edge); 
                if (firstComponentIdx > secondComponentIdx) {
                    componentManagers.splice(firstComponentIdx, 1);
                    componentManagers.splice(secondComponentIdx, 1);
                } else {
                    componentManagers.splice(secondComponentIdx, 1);
                    componentManagers.splice(firstComponentIdx, 1);
                }

                componentManagers.push(SetBasedComponentManager.ofComponent(newComponent));
                break;
            }
        }

        return componentManagers.map(c => c.getComponent());
    }

    removeEdge(components: Component[], edge: Edge): Component[] {
        const resultComponents: Component[] = [];

        for (const component of components) {
            const manager = SetBasedComponentManager.ofComponent(component);
            if (manager.hasEdge(edge)) {
                manager.removeEdge(edge);

                const splittedComponents: Component[] = new ComponentSplitter().split(manager.getComponent());
                
                splittedComponents.forEach(c => resultComponents.push(c));
            } else {
                resultComponents.push(component);
            }
        }
        
        return resultComponents;
    }
}

export default EdgeManager;