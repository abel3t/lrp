// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import member from 'src/store/member'
import friend from 'src/store/friend'
import care from 'src/store/care'

export const store = configureStore({
  reducer: {
    member,
    friend,
    care
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
