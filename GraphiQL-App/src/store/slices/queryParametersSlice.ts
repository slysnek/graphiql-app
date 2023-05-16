import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../reduxStore';
import { QueryParameters } from '../../types/interfaces';

const initialState: QueryParameters = {
  isRequested: false,
  isLoaded: false,
  body: '',
  variables: '',
  headers: '',
};

export const queryParametersSlice = createSlice({
  name: 'queryParameters',
  initialState,
  reducers: {
    setQueryParameters: (state, action: PayloadAction<QueryParameters>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setQueryParameters } = queryParametersSlice.actions;
export const queryParameters = (state: RootState) => state.queryParameters;
export default queryParametersSlice.reducer;
