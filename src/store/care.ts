import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../@core/services/api.client'
import { Care } from '../@core/types'

export const fetchData = createAsyncThunk('care/fetchData', async () => {
  const response = await apiClient.get('/cares')

  return response.data
})

export const fetchCareData = createAsyncThunk('care/fetchCareData', async (careId: string) => {
  const response = await apiClient.get(`/cares/${careId}`)

  return response.data
})

// export const deleteCare = createAsyncThunk(
//   'appCare/deleteData',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await apiClient.delete('/apps/care/delete', {
//       data: id
//     })
//     await dispatch(fetchData(getState().care.params))
//
//
//     return response.data
//   }
// )

export const appCareSlice = createSlice({
  name: 'care',
  initialState: {
    data: [],
    care: {} as Care
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    }),
      builder.addCase(fetchCareData.fulfilled, (state, action) => {
        state.care = action.payload
      })
  }
})

export default appCareSlice.reducer
