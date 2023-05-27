import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../reduxStore';
import { HistoryState } from '../../types/interfaces';

const initialState: HistoryState = {
  history: <any>[],
};

export const historySlice = createSlice({
  name: 'historyState',
  initialState,
  reducers: {
    addObject: (state, action: PayloadAction<any>) => {
      state.history.push(action.payload);
    },
    removeObject: (state) => {
      state.history.pop();
    },
  },
});

export const { addObject, removeObject } = historySlice.actions;
export const historyState = (state: RootState) => state.historyState;
export default historySlice.reducer;
