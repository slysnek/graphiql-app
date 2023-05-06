import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string;
  token: string;
  id: string;
  isLogged: boolean;
}

const initialState = {
  email: '',
  token: '',
  id: '',
  isLogged: false,
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
        isLogged: action.payload.isLogged,
      };
    },
    exitUser: (state) => {
      return { ...state, email: '', token: '', id: '', isLogged: false };
    },
  },
});

export default userSlice.reducer;

export const { setUser, exitUser } = userSlice.actions;
