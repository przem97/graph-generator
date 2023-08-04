import { createSlice } from '@reduxjs/toolkit';
import { NodeDrawingStrategy, DEFAULT_STRATEGY } from '../../../../draw/strategy/node.draw.strategy';
import { RootState } from '../../../store/store';

export type StrategyStateType = {
    strategy: NodeDrawingStrategy
} 

const initialState = {
    strategy: DEFAULT_STRATEGY
} as StrategyStateType;

const strategySlice = createSlice({
    name: 'strategy',
    initialState,
    reducers: {
        setAddStrategy(state): StrategyStateType {
            return { ...state, strategy: NodeDrawingStrategy.Add };
        },
        setRemoveStrategy(state): StrategyStateType {
            return { ...state, strategy: NodeDrawingStrategy.Remove };
        },
        setEditStrategy(state): StrategyStateType {
            return { ...state, strategy: NodeDrawingStrategy.Edit };
        },
        setConnectStrategy(state): StrategyStateType {
            return { ...state, strategy: NodeDrawingStrategy.Connect };
        }
    }
});

export const selectStrategy = (state: RootState) => state.strategyReducer.strategy;
export const { setAddStrategy, setRemoveStrategy, setEditStrategy, setConnectStrategy } = strategySlice.actions;
export default strategySlice.reducer;