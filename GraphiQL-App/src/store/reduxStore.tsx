import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import docPaneStateSlice from './slices/docPaneStateSlice';

const rootReducer = combineReducers({
  userAuth: userReducer,
	docPaneState: docPaneStateSlice,
});

export const store = configureStore({
  reducer: rootReducer,    
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
