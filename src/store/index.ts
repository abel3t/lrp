// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import member from 'src/store/member'
import friend from 'src/store/friend'

export const store = configureStore({
  reducer: {
    member,
    friend
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
