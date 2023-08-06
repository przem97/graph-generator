import Edge from "../../../models/edge";
import Component from "../../../models/component";
import ComponentMerger from "../merger/componentMerger";
import IComponentSplitter from "./componentSplitter.interface";
import SetBasedComponentManager from "../manager/setBasedComponentManager";
import e from "express";

export default class ComponentSplitter implements IComponentSplitter {
    split(component: Component): Component[] {
        const components: Component[] = [];
        const edgesQueue: Edge[] = [ ...component.edges ];

        // create list of components to merge
        for (let i = 0; i < component.vertices.length; i++) {
            components.push(new Component([], [ { ...component.vertices[i] } ]));
        }

        // merge all the components
        let i = 0;
        let j = i + 1;
        while (i < components.length) {
            if (j >= components.length) {
                i += 1;
                j = i + 1;
                continue;
            }

            let k = 0;
            const mergingEdgesIndexList: number[] = [];
            while (k < edgesQueue.length) {
                let tempEdge = edgesQueue[k];
                const newComponent = new ComponentMerger().merge(components[i], components[j], tempEdge);
                if (!newComponent.isEmpty()) {
                    mergingEdgesIndexList.push(k);
                }
                k += 1;
            }
            
            if (mergingEdgesIndexList.length > 0) {
                const newComponent = new ComponentMerger().merge(components[i], components[j], edgesQueue[mergingEdgesIndexList[0]]);
                const manager = SetBasedComponentManager.ofComponent(newComponent);
                
                for (let k = 1; k < mergingEdgesIndexList.length; k++) {
                    manager.addEdge(edgesQueue[mergingEdgesIndexList[k]]);
                }

                for (let k = mergingEdgesIndexList.length - 1; k >= 0; k--) {
                    edgesQueue.splice(mergingEdgesIndexList[k], 1);
                }

                components.splice(j, 1);
                components.splice(i, 1, manager.getComponent());
            } else {
                j += 1;
            }
        }

        return components;
    }
}
