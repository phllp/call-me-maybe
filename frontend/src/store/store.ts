import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counter-slice';
import callStatusReducer from '@store/features/call-status/call-status-slice';

// this uses the combineReducer under the hood so we can access our reducer throught state.counter
export const store = configureStore({
  reducer: { counter: counterReducer, callStatus: callStatusReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
