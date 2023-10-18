import {configureStore} from '@reduxjs/toolkit';
import {fansApi} from './services/fansApi';
import fansReducer from './slices/fansSlice';

export const store = configureStore({
  reducer: {
    [fansApi.reducerPath]: fansApi.reducer,
    fans: fansReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(fansApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
