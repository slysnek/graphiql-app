import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSDLSchemaTypes } from '../../helpers/Utils';
import { RootState } from '../reduxStore';

export const getSDLSchema = createAsyncThunk('docs/getSchema', async () => {
  const response = await getSDLSchemaTypes();
  console.log(response);
  if (response === null) return null;
  return response;
});

interface SDLSchemaState {
  SDLSchema: any;
  status: any;
}

const initialState = {
  SDLSchema: null,
  status: null,
} as SDLSchemaState;

const schemaSlice = createSlice({
  name: 'schemaState',
  initialState,
  reducers: {
/*     changeModal: (state, action) => {
      state.isModalActive = action.payload;
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(getSDLSchema.pending, (state) => {
      state.status = 'Loading schema';
      console.log('BBBBBBBBBBBBBBBBBBBBBBB');
    }),
      builder.addCase(getSDLSchema.fulfilled, (state, action) => {
        state.status = 'Schema is loaded';
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        if (action.payload === null) {
          return;
        }
        Object.assign(state, action.payload);
      }),
      builder.addCase(getSDLSchema.rejected, (state) => {
        state.status = "Schema didn't load. Please try again.";
      });
  },
});

/* export const { changeModal } = schemaSlice.actions; */
export const schemaState = (state: RootState) => state.schemaState;
export default schemaSlice.reducer;
