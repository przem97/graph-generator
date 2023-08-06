import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NodeDrawingStrategy, DEFAULT_STRATEGY } from '../../../../draw/strategy/node.draw.strategy';
import { RootState } from '../../../store/store';

export type StrategyStateType = {
    strategy: NodeDrawingStrategy
} 

const initialState = {
    strategy: DEFAULT_STRATEGY
} as StrategyStateType;

type SetStrategyPayloadType = {
    strategy: NodeDrawingStrategy
}

const strategySlice = createSlice({
    name: 'strategy',
    initialState,
    reducers: {
        setStrategy(state, action: PayloadAction<SetStrategyPayloadType>): StrategyStateType {
            return { ...state, strategy: action.payload.strategy };
        }
    }
});

export const selectStrategy = (state: RootState) => state.strategyReducer.strategy;
export const { setStrategy } = strategySlice.actions;
export default strategySlice.reducer;