import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CallStatusState = {
  current: 'idle' | 'progress' | 'negotiating' | 'complete';
  video: 'off' | 'enabled' | 'disabled' | 'complete';
  audio: 'off' | 'enabled' | 'disabled' | 'complete';
  audioDevice: string;
  videoDevice: string;
  shareScreen: boolean;
  haveMedia: boolean;
  haveCreatedOffer: boolean;
};

const initialState: CallStatusState = {
  current: 'idle',
  video: 'off',
  audio: 'off',
  audioDevice: 'default',
  videoDevice: 'default',
  shareScreen: false,
  haveMedia: false,
  haveCreatedOffer: false,
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
