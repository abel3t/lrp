import { configureStore } from '@reduxjs/toolkit';

import account from './account';
import care from './care';
import dashboard from './dashboard';
import friend from './friend';
import member from './member';

export const store = configureStore({
  reducer: {
    member,
    friend,
    care,
    account,
    dashboard
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
