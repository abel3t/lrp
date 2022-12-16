import { configureStore } from '@reduxjs/toolkit'
import account from 'src/store/account'
import care from 'src/store/care'
import dashboard from 'src/store/dashboard'
import friend from 'src/store/friend'
import member from 'src/store/member'

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
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
