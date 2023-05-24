import { combineReducers } from "@reduxjs/toolkit";
import nodesReducer from './node/nodeSlice';
import strategyReducer from './strategy/draw/strategySlice';

export const rootReducer = combineReducers({
    nodesReducer,
    strategyReducer
});

export type RootState = ReturnType<typeof rootReducer>;