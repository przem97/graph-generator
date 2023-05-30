import { createSlice } from '@reduxjs/toolkit';
import Node, { NodeType } from '../../../model/node';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { RADIUS } from '../../../draw/standard/graph.drawer';
import { LEADING } from '../../../draw/standard/grid.drawer';
import { ComponentType } from '../../../model/component';

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
        saveComponents(state, action: PayloadAction<SaveComponentsPayloadActionType>): ComponentStateType {
            return { ...state, components: action.payload.components }
        }
    }
});

export const { saveComponents } = componentSlice.actions;
export default componentSlice.reducer;