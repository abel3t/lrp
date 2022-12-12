// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import member from 'src/store/member'

export const store = configureStore({
  reducer: {
    member
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
