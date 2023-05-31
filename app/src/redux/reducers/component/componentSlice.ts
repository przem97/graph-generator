import { createSlice } from '@reduxjs/toolkit';
import Node, { NodeType } from '../../../model/node';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { RADIUS } from '../../../draw/standard/graph.drawer';
import { LEADING } from '../../../draw/standard/grid.drawer';
import Component, { ComponentType } from '../../../model/component';
import Edge, { EdgeType } from '../../../model/edge';

export type ComponentStateType = {
    components: ComponentType[]
}

const initialState = {
    components: []
} as ComponentStateType

type SaveComponentsPayloadActionType = {
    components: ComponentType[]
}

const componentSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<NodeType>): ComponentStateType {
            // create new component
            const cloned: ComponentType[] = JSON.parse(JSON.stringify(state.components));
            cloned.push(Component.create([ Node.create(action.payload.x, action.payload.y) ], []))
            return { ...state, components: cloned };
        },
        removeNode(state, action: PayloadAction<NodeType>): ComponentStateType { 
            const toRealRadius = (radius: number, leading: number) => radius / (window.devicePixelRatio * 2 * leading);
            const intersect = (current: NodeType, target: NodeType) => {
                const radius = toRealRadius(RADIUS, LEADING);
                return Math.pow((current.x - target.x), 2) + Math.pow((current.y - target.y), 2) <= Math.pow(radius, 2);
            };

            let targetClickNode: NodeType = Node.create(action.payload.x, action.payload.y)
            let deleted = false; // indicates the node has been deleted just to not delete overlapping nodes
            
            const resultComponents: ComponentType[] = [];
            
            // traverse all the components
            for (let i = 0; i < state.components.length; i++) {
                const component = state.components[i];
                const resultNodes: NodeType[] = [];

                let nodeToRemove: NodeType | null = null;
                for (let j = 0; j < component.nodes.length; j++) {
                    const currentNode = component.nodes[j];

                    if (intersect(currentNode, targetClickNode) && !deleted) {
                        deleted = true;
                        nodeToRemove = currentNode;
                    } else {
                        resultNodes.push(Node.create(currentNode.x, currentNode.y, currentNode.ordinal));
                    }
                }

                // if node to remove has been found then delete all the edges outgoing from it
                if (nodeToRemove != null) {
                    const resultEdges: EdgeType[] = [];

                    for (let j = 0; j < component.edges.length; j++) {
                        let edge: EdgeType = component.edges[j];
                        if (edge.endVertex != nodeToRemove?.ordinal && edge.startVertex != nodeToRemove.ordinal) {
                            resultEdges.push(Edge.create(edge.endVertex, edge.startVertex, edge.weight));
                        }
                    }        

                    resultComponents.push(Component.create(resultNodes, resultEdges));
                } else {
                    const resultEdges: EdgeType[] = JSON.parse(JSON.stringify(component.edges));
                    resultComponents.push(Component.create(resultNodes, resultEdges));
                }
            }

            return { ...state, components: resultComponents }
        },
        saveComponents(state, action: PayloadAction<SaveComponentsPayloadActionType>): ComponentStateType {
            return { ...state, components: action.payload.components }
        }
    }
});

export const { addNode, removeNode, saveComponents } = componentSlice.actions;
export default componentSlice.reducer;