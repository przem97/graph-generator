import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CanvasState {
  centerX: number;
  centerY: number;
} 

const initialState = {
    centerX: 0,
    centerY: 0
} as CanvasState;

type CanvasCenter = {
    centerX: number;
    centerY: number;
}

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        updatePlane(state, action: PayloadAction<CanvasCenter>): CanvasState {
            return { ...state, centerX: action.payload.centerX, centerY: action.payload.centerY};
        }
    }
});

export const { updatePlane } = canvasSlice.actions;
export default canvasSlice.reducer;