import { createSlice } from '@reduxjs/toolkit';
import { NodeDrawingStrategy, DEFAULT_STRATEGY } from '../../../draw/strategy/node.draw.strategy';

export interface StrategyState {
  strategy: NodeDrawingStrategy
} 

const initialState = {
  strategy: DEFAULT_STRATEGY
} as StrategyState;

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    add(state): StrategyState {
      return { ...state, strategy: NodeDrawingStrategy.Add };
    },
    remove(state): StrategyState {
      return { ...state, strategy: NodeDrawingStrategy.Remove };
    },
    edit(state): StrategyState {
      return { ...state, strategy: NodeDrawingStrategy.Edit };
    }
  }
});

export const { add, remove, edit } = strategySlice.actions;
export default strategySlice.reducer;