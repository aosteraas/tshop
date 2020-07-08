import rootReducer from './rootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
