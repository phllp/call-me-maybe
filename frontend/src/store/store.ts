import { configureStore } from '@reduxjs/toolkit';
import reducer from './features/counter/counter-slice';

// this uses the combineReducer under the hood so we can access our reducer throught state.counter
export const store = configureStore({
  reducer: { counter: reducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
