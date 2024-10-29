import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
  Tuple,
} from '@reduxjs/toolkit';
import counterReducer from '@store/features/counter/counter-slice';
import callStatusReducer from '@store/features/call-status/call-status-slice';

const isSerializable = (value: unknown) =>
  value instanceof MediaStream ||
  isPlain(value) ||
  value instanceof RTCPeerConnection ||
  value instanceof RTCSessionDescription;

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
});

// this uses the combineReducer under the hood so we can access our reducer throught state.counter
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    callStatus: callStatusReducer,
  },
  // todo: temporary solution. (not)
  middleware: () => new Tuple(serializableMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
