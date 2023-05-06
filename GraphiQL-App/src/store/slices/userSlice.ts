import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  isLogged: boolean;
}

const initialState = {
  email: null,
  token: null,
  id: null,
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
      return { ...state, email: null, token: null, id: null, isLogged: false };
    },
  },
});

export default userSlice.reducer;

export const { setUser, exitUser } = userSlice.actions;
