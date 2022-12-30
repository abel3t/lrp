import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Account } from '@core/types';

export const fetchCurators = createAsyncThunk('account/fetchCurators', async () => {
  const response = await apiClient.get('/curators');

  return response.data;
});

export const fetchProfile = createAsyncThunk('account/fetchProfile', async () => {
  const response = await apiClient.get('/profile');

  return response.data;
});

export const appAccountSlice = createSlice({
  name: 'account',
  initialState: {
    curators: [],
    account: {} as Account
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurators.fulfilled, (state, action) => {
      state.curators = action.payload;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.account = action.payload;
    });
  }
});

export default appAccountSlice.reducer;
