import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../reduxStore';
import { LangState } from '../../types/interfaces';
import i18n from '../../i18n';

const initialState: LangState = {
  language: 'en'
};

export const langSlice = createSlice({
  name: 'langState',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(state.language)
    },
  },
});

export const { setLang } = langSlice.actions;
export const langState = (state: RootState) => state.langState;
export default langSlice.reducer;