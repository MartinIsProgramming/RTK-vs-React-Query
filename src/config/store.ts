import { configureStore } from '@reduxjs/toolkit';
import { baseAi } from '../api/baseApi';

export const store = configureStore({
  reducer: {
    [baseAi.reducerPath]: baseAi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseAi.middleware),
});
