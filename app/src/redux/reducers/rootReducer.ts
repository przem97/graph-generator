import { combineReducers } from "@reduxjs/toolkit";
import nodesReducer from './node/nodeSlice';
import strategyReducer from './strategy/draw/strategySlice';
import componentsReducer from './component/componentSlice';

export const rootReducer = combineReducers({
    nodesReducer,
    strategyReducer,
    componentsReducer
});

export type RootState = ReturnType<typeof rootReducer>;