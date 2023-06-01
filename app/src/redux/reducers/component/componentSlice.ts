import { createSlice } from '@reduxjs/toolkit';
import Node, { NodeType } from '../../../model/node';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import Component, { ComponentType } from '../../../model/component';
import Edge, { EdgeType } from '../../../model/edge';
import { ComponentUtils } from '../../../model/util/componentUtils';
import { NodeUtils } from '../../../model/util/nodeUtils';

export type ComponentStateType = {
    components: ComponentType[]
    connectAccumulator: number[];
}

const initialState = {
    components: [],
    connectAccumulator: []
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
            let ordinal = ComponentUtils.getNextNodeOrdinal(state.components);
            const cloned: ComponentType[] = JSON.parse(JSON.stringify(state.components));
            cloned.push(Component.create([ Node.create(action.payload.x, action.payload.y, ordinal) ], []))
            return { ...state, components: cloned };
        },
        removeNode(state, action: PayloadAction<NodeType>): ComponentStateType {
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

                    if (NodeUtils.intersect(currentNode, targetClickNode) && !deleted) {
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
        },
        connect(state, action: PayloadAction<number>): ComponentStateType {
            let newConnectAccumulator: number[] = [];
            
            if (state.connectAccumulator.length < 1) {
                newConnectAccumulator.push(action.payload);
            } else if (newConnectAccumulator[0] == action.payload) {
                return { ...state }
            } else {
                // merge components
                const resultComponents: ComponentType[] = [];
                const componentsToMerge: ComponentType[] = [];

                let nodesWithinTheSameComponent = false;

                for (let i = 0; i < state.components.length; i++) {
                    const component = state.components[i];

                    const isFirstPresent = !!(_.find(component.nodes, (node: NodeType) => node.ordinal === state.connectAccumulator[0]));
                    const isSecondPresent = !!(_.find(component.nodes, (node: NodeType) => node.ordinal === action.payload));
                    if (isFirstPresent && isSecondPresent && !nodesWithinTheSameComponent) {
                        componentsToMerge.push(component);
                        nodesWithinTheSameComponent = true;
                    } else if (isFirstPresent || isSecondPresent) {
                        componentsToMerge.push(component);
                    } else {
                        resultComponents.push(_.cloneDeep(component));
                    }
                }
                
                if (componentsToMerge.length >= 2) {
                    // nodes found in the different components
                    const merged: ComponentType = ComponentUtils.mergeComponents(componentsToMerge[0], componentsToMerge[1]);
                    const connectEdge: EdgeType = Edge.create(state.connectAccumulator[0], action.payload, 0);
                    
                    merged.edges.push(connectEdge);
                    resultComponents.push(merged);

                    return { ...state, components: resultComponents, connectAccumulator: newConnectAccumulator }
                } else if (componentsToMerge.length == 1) {
                    // nodes found within the same component
                    const connectEdge: EdgeType = Edge.create(state.connectAccumulator[0], action.payload, 0);
                    
                    const newComponent = _.cloneDeep(componentsToMerge[0]);
                    newComponent.edges.push(connectEdge);

                    resultComponents.push(newComponent);
                    return { ...state, components: resultComponents, connectAccumulator: newConnectAccumulator }
                }
            }

            return { ...state, connectAccumulator: newConnectAccumulator }
        }
    }
});

export const { addNode, removeNode, saveComponents, connect } = componentSlice.actions;
export default componentSlice.reducer;