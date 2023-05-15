import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../reduxStore';
import { DocPaneState } from '../../types/interfaces';

const initialState: DocPaneState = {
  visible: false,
};

export const docPaneStateSlice = createSlice({
  name: 'docPaneState',
  initialState,
  reducers: {
    setDocPaneState: (state, action: PayloadAction<DocPaneState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setDocPaneState } = docPaneStateSlice.actions;
export const docPaneState = (state: RootState) => state.docPaneState;
export default docPaneStateSlice.reducer;
