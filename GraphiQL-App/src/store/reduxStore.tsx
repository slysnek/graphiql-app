import { configureStore } from '@reduxjs/toolkit';

import docPaneStateSlice from './slices/docPaneStateSlice';
import queryPanelStateSlice from './slices/queryPanelStateSlice';
import queryParametersSlice from './slices/queryParametersSlice';

export const store = configureStore({
  reducer: {
    docPaneState: docPaneStateSlice,
    queryPanelState: queryPanelStateSlice,
    queryParameters: queryParametersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
