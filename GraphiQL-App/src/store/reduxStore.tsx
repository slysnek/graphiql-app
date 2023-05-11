import { configureStore } from '@reduxjs/toolkit';

import docPaneStateSlice from './slices/docPaneStateSlice';

export const store = configureStore({
  reducer: {
    docPaneState: docPaneStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
