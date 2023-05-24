import { createSlice } from '@reduxjs/toolkit';
import { NodeType } from '../../../model/node';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { RADIUS } from '../../../draw/standard/node.drawer';
import { LEADING } from '../../../draw/standard/grid.drawer';

export type NodeStateType = {
    nodes: NodeType[]
}

const initialState = {
  nodes: []
} as NodeStateType

type AddNodePayloadActionType = {
    x: number,
    y: number
}

const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<AddNodePayloadActionType>): NodeStateType {
            let newArray = _.concat(state.nodes, [{ x : action.payload.x, y: action.payload.y }]);
            return { ...state, nodes: newArray }
        },
        removeNode(state, action: PayloadAction<AddNodePayloadActionType>): NodeStateType { 
            const toRealRadius = (radius: number, leading: number) => radius / (window.devicePixelRatio * 2 * leading);
            const intersect = (current: NodeType, target: NodeType) => {
                const radius = toRealRadius(RADIUS, LEADING);
                return Math.pow((current.x - target.x), 2) + Math.pow((current.y - target.y), 2) <= Math.pow(radius, 2);
            };

            let targetNode = { x : action.payload.x, y: action.payload.y };
            let resultNodes = [];
            let deleted = false; // indicates the node has been deleted just to not delete overlapping nodes
            
            for (let i = (state.nodes.length - 1); i >= 0; i--) {
                let currentNode = state.nodes[i];
                if (!intersect(currentNode, targetNode) || deleted) {
                    resultNodes.push({ x: currentNode.x, y: currentNode.y })
                } else {
                    deleted = true;
                }
            }

            return { ...state, nodes: resultNodes }
        },
        editNode(state, action: PayloadAction<AddNodePayloadActionType>): NodeStateType { 
            console.log('editing node!');
            return { ...state }
        }
    }
});

export const { addNode, removeNode, editNode } = nodesSlice.actions;
export default nodesSlice.reducer;