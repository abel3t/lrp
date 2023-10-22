import { configureStore } from '@reduxjs/toolkit';

import account from './account';
import care from './care';
import dashboard from './dashboard';
import friend from './friend';
import member from './member';
import disciple from './disciple';
import person from './person';
import absence from './absence';

export const store = configureStore({
  reducer: {
    member,
    friend,
    care,
    account,
    dashboard,
    disciple,
    person,
    absence
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
