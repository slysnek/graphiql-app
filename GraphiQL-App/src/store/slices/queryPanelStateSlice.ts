import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../reduxStore';
import { QueryPanelState } from '../../types/interfaces';

const initialState: QueryPanelState = {
  isOpened: false,
  sizes: [0, 0],
  prev_sizes: [0, 0],
};

export const queryPanelStateSlice = createSlice({
  name: 'queryPanelState',
  initialState,
  reducers: {
    setQueryPanelState: (state, action: PayloadAction<QueryPanelState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setQueryPanelState } = queryPanelStateSlice.actions;
export const queryPanelState = (state: RootState) => state.queryPanelState;
export default queryPanelStateSlice.reducer;
