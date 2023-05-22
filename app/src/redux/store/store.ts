import { configureStore } from '@reduxjs/toolkit';

import reducer from '../reducers/strategy/draw/drawStrategySlice';

export const store = configureStore({
  reducer: reducer
});