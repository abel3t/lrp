import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import apiClient from '../@core/services/api.client'

export const fetchOverview = createAsyncThunk('dashboard/fetchOverview', async () => {
  const response = await apiClient.get(`/dashboard/overview`)

  return response.data
})

export const fetchNeedingMoreCareMembers = createAsyncThunk('dashboard/fetchNeedingMoreCareMembers', async () => {
  const response = await apiClient.get(`/dashboard/needing-more-care`)

  return response.data
})

export const fetchTopCaringPeople = createAsyncThunk('dashboard/fetchTopCaringPeople', async () => {
  const response = await apiClient.get(`/dashboard/top-caring`)

  return response.data
})

export const appCareSlice = createSlice({
  name: 'care',
  initialState: {
    overview: {} as any,
    needingMoreCareMembers: [],
    topCaringPeople: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOverview.fulfilled, (state, action) => {
      state.overview = action.payload
    }),
      builder.addCase(fetchNeedingMoreCareMembers.fulfilled, (state, action) => {
        state.needingMoreCareMembers = action.payload
      }),
      builder.addCase(fetchTopCaringPeople.fulfilled, (state, action) => {
        state.topCaringPeople = action.payload
      })
  }
})

export default appCareSlice.reducer
