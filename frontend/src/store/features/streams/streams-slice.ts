import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StreamState = {
  who: string;
  stream: MediaStream;
};

const initialState: StreamState[] = [];

const streamsSlice = createSlice({
  name: 'streams',
  initialState,
  reducers: {
    addStream(state, action: PayloadAction<StreamState>) {
      const index = state.findIndex(
        (stream) => stream.who === action.payload.who
      );

      if (index !== -1) {
        /** Index found, so there is a stream for that user, we only need to replace it */
        state[index] = action.payload;
      } else {
        /** User stream not present in the array yet, so include it */
        state.push(action.payload);
      }
    },
  },
});

export const { addStream } = streamsSlice.actions;

export default streamsSlice.reducer;
