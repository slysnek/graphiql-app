import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../reduxStore';
import { LangState } from '../../types/interfaces';

const initialState: LangState = {
  language: 'EN'
};

export const langSlice = createSlice({
  name: 'langState',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      console.log(state.language);
    },
  },
});

export const { setLang } = langSlice.actions;
export const langState = (state: RootState) => state.langState;
export default langSlice.reducer;