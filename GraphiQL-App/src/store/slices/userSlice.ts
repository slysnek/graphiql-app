import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string;
  token: string;
  id: string;
  name: string;
}

const initialState = {
  email: '',
  token: '',
  id: '',
  name: '',
} as UserState;

const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
      };
    },
    setName: (state, action: PayloadAction<UserState>) => {
      return { ...state, name: action.payload.name };
    },
    exitUser: (state) => {
      return { ...state, email: '', token: '', id: '', isLogged: false, name: '' };
    },
  },
});

export default userSlice.reducer;

export const { setUser, exitUser, setName } = userSlice.actions;
