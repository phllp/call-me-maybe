// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    ammountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, ammountAdded } = counterSlice.actions;

export default counterSlice.reducer;
