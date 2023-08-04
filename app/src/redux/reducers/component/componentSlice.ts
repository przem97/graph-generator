import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from '../../../model/component';
import { removeNode } from '../../thunks/vertex/removeNodeThunk';

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
        saveComponents(state: ComponentStateType, action: PayloadAction<SaveComponentsPayloadActionType>): ComponentStateType {
            return { ...state, components: action.payload.components }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeNode.fulfilled, (state, { payload }) => {
            state.components = payload;
        });
    }
});

export const { saveComponents } = componentSlice.actions;
export default componentSlice.reducer;