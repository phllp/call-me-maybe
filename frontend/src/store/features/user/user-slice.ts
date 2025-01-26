import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  name: string;
}

const initialState: UserState = { id: '', name: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData(state, action: PayloadAction<Partial<UserState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
