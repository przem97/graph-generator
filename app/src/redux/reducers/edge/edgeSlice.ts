import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import _ from 'lodash';
import { addEdgeThunk } from '../../thunks/edge/addEdgeThunk';
import Component, { ComponentType } from '../../../model/component';
import { NodeType } from '../../../model/node';

export type ComponentStateType = {
    connectAccumulator: number[];
}

const initialState = {
    connectAccumulator: []
} as ComponentStateType

type ConnectAccumulatorPushActionType = {
    nodeOrdinal: number
}

const edgeSlice = createSlice({
    name: 'edges',
    initialState,
    reducers: {
        connectAccumulatorPush(state: ComponentStateType, action: PayloadAction<ConnectAccumulatorPushActionType>) {
            const cloned: number[] = _.clone(state.connectAccumulator);
            cloned.push(action.payload.nodeOrdinal);
            return { ...state, connectAccumulator: cloned };
        },
        clearConnectAccumulator(state: ComponentStateType): ComponentStateType {
            return { ...state, connectAccumulator: [] };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addEdgeThunk.fulfilled, (state) => {
            state.connectAccumulator = [];
        });
    }
});

export const selectConnectAccumulator = (state: RootState) => state.edgeReducer.connectAccumulator;
export const selectConnectNodeAccumulator: ((state: RootState) => NodeType[]) = (state) => {
    const nodes: NodeType[] = [];
    state.edgeReducer.connectAccumulator.forEach((ordinal: number) => {
        const node: NodeType | null = Component.findNodeByOrdinal(ordinal, state.componentsReducer.components);
        if (node !== null && node !== undefined) {
            nodes.push(node);
        }
    });
    return nodes;
};
export const { connectAccumulatorPush, clearConnectAccumulator } = edgeSlice.actions;
export default edgeSlice.reducer;