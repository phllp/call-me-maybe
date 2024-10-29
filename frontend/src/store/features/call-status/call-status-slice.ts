import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CallStatusState = {
  current: 'idle' | 'progress' | 'negotiating' | 'complete';
  video: boolean;
  audio: boolean;
  audioDevice: string;
  videoDevice: string;
  shareScreen: boolean;
  haveMedia: boolean;
};

const initialState: CallStatusState = {
  current: 'idle',
  video: false,
  audio: false,
  audioDevice: 'default',
  videoDevice: 'default',
  shareScreen: false,
  haveMedia: false,
};

const callStatusSlice = createSlice({
  name: 'callStatus',
  initialState,
  reducers: {
    updateCallStatus(state, action: PayloadAction<Partial<CallStatusState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateCallStatus } = callStatusSlice.actions;

export default callStatusSlice.reducer;
