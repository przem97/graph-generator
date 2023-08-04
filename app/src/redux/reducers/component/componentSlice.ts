import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ComponentType } from '../../../model/component';
import { removeNode } from '../../thunks/vertex/removeNodeThunk';
import { addEdgeThunk } from '../../thunks/edge/addEdgeThunk';
import { RootState } from '../../store/store';

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
        saveComponents(state: ComponentStateType, action: PayloadAction<SaveComponentsPayloadActionType>): ComponentStateType {
            return { ...state, components: action.payload.components }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeNode.fulfilled, (state, { payload }) => {
            state.components = payload;
        });

        builder.addCase(addEdgeThunk.fulfilled, (state, { payload }) => {
            state.components = payload;
        });
    }
});

export const selectComponents = (state: RootState) => state.componentsReducer.components;
export const { saveComponents } = componentSlice.actions;
export default componentSlice.reducer;