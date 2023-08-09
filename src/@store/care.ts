import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Care } from '@core/types';
import { convertObjectToQueryString } from '@core/utils/string.util';

interface IQueryCare {
  search?: string;
  curatorId?: string;
}

export const fetchData = createAsyncThunk('care/fetchData', async (query?: IQueryCare) => {
  const response = await apiClient.get('/cares' + convertObjectToQueryString(query));

  return response.data.map((x: Care) => ({ ...x, member: x.person }));
});

export const fetchCareData = createAsyncThunk('care/fetchCareData', async (careId: string) => {
  const response = await apiClient.get(`/cares/${careId}`);

  return response.data;
});

export const fetchMemberCaresData = createAsyncThunk('care/fetchMemberCaresData', async (memberId: string) => {
  const response = await apiClient.get(`/cares/members/${memberId}`);

  return response.data;
});

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
    care: {} as Care,
    memberCares: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    }),
      builder.addCase(fetchCareData.fulfilled, (state, action) => {
        state.care = action.payload;
      }),
      builder.addCase(fetchMemberCaresData.fulfilled, (state, action) => {
        state.memberCares = action.payload;
      });
  }
});

export default appCareSlice.reducer;
