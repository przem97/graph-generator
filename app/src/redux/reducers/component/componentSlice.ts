import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Component, { ComponentType } from '../../../model/component';
import { removeNode } from '../../thunks/vertex/removeNodeThunk';
import { addEdgeThunk } from '../../thunks/edge/addEdgeThunk';
import { RootState } from '../../store/store';
import Node, { NodeType } from '../../../model/node';
import _ from 'lodash';

export type ComponentStateType = {
    components: ComponentType[]
}

const initialState = {
    components: []
} as ComponentStateType

type SaveComponentsPayloadActionType = {
    components: ComponentType[]
}
type AddComponentPayloadActionType = {
    vertex: NodeType
}

const componentSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        addComponentWithNode(state: ComponentStateType, action: PayloadAction<AddComponentPayloadActionType>): ComponentStateType {
            const newComponents = _.cloneDeep(state.components);
            const nextOrdinal = Node.getNextNodeOrdinal(state.components);
            const newNode = Node.create(action.payload.vertex.x, action.payload.vertex.y, nextOrdinal);

            newComponents.push(Component.create([ newNode ], []));

            return { ...state, components: newComponents };
        },
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
export const { saveComponents, addComponentWithNode } = componentSlice.actions;
export default componentSlice.reducer;