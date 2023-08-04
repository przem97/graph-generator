import { combineReducers } from "@reduxjs/toolkit";
import strategyReducer from './strategy/draw/strategySlice';
import componentsReducer from './component/componentSlice';

export const rootReducer = combineReducers({
    strategyReducer,
    componentsReducer
});