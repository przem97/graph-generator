import { combineReducers } from "@reduxjs/toolkit";
import strategyReducer from './strategy/draw/strategySlice';
import componentsReducer from './component/componentSlice';
import edgeReducer from './edge/edgeSlice';

export const rootReducer = combineReducers({
    strategyReducer,
    componentsReducer,
    edgeReducer
});