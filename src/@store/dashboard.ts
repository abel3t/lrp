import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';

import { convertObjectToQueryString } from '../@core/utils/string.util';

interface IDashboardQuery {
  set?: number;
}

export const fetchOverview = createAsyncThunk('dashboard/fetchOverview', async (query?: IDashboardQuery) => {
  const response = await apiClient.get(`/dashboard/overview` + convertObjectToQueryString(query));

  return response.data;
});

export const fetchNeedingMoreCareMembers = createAsyncThunk(
  'dashboard/fetchNeedingMoreCareMembers',
  async (query?: IDashboardQuery) => {
    const response = await apiClient.get(`/dashboard/needing-more-care` + convertObjectToQueryString(query));

    return response.data;
  }
);

export const fetchTopCaringPeople = createAsyncThunk(
  'dashboard/fetchTopCaringPeople',
  async (query?: IDashboardQuery) => {
    const response = await apiClient.get(`/dashboard/top-caring` + convertObjectToQueryString(query));

    return response.data;
  }
);

export const appCareSlice = createSlice({
  name: 'care',
  initialState: {
    overview: {} as any,
    needingMoreCareMembers: [] as any[],
    topCaringPeople: [] as any[]
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOverview.fulfilled, (state, action) => {
      state.overview = action.payload;
    }),
      builder.addCase(fetchNeedingMoreCareMembers.fulfilled, (state, action) => {
        state.needingMoreCareMembers = action.payload;
      }),
      builder.addCase(fetchTopCaringPeople.fulfilled, (state, action) => {
        state.topCaringPeople = action.payload;
      });
  }
});

export default appCareSlice.reducer;
