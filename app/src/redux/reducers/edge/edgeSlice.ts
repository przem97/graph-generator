import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import _ from 'lodash';
import { addEdgeThunk } from '../../thunks/edge/addEdgeThunk';

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
            return { ...state, connectAccumulator: cloned }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addEdgeThunk.fulfilled, (state) => {
            state.connectAccumulator = [];
        });
    }
});

export const selectConnectAccumulator = (state: RootState) => state.edgeReducer.connectAccumulator;
export const { connectAccumulatorPush } = edgeSlice.actions;
export default edgeSlice.reducer;