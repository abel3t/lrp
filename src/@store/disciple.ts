import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Disciple } from '@core/types';
import { convertObjectToQueryString } from '@core/utils/string.util';

interface IQueryDisciple {
  search?: string;
  curatorId?: string;
}

export const fetchData = createAsyncThunk('disciple/fetchData', async (query?: IQueryDisciple) => {
  const response = await apiClient.get('/disciples' + convertObjectToQueryString(query));

  return response.data.map((x: Disciple) => ({ ...x, member: x.person }));
});

export const fetchDiscipleData = createAsyncThunk('disciple/fetchDiscipleData', async (discipleId: string) => {
  const response = await apiClient.get(`/disciples/${discipleId}`);

  return response.data;
});

export const fetchPersonDisciplesData = createAsyncThunk('disciple/fetchpersonDisciplesData', async (personId: string) => {
  const response = await apiClient.get(`/disciples/people/${personId}`);

  return response.data;
});

// export const deleteDisciple = createAsyncThunk(
//   'appDisciple/deleteData',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await apiClient.delete('/apps/disciple/delete', {
//       data: id
//     })
//     await dispatch(fetchData(getState().disciple.params))
//
//
//     return response.data
//   }
// )

export const appDiscipleSlice = createSlice({
  name: 'disciple',
  initialState: {
    data: [],
    disciple: {} as Disciple,
    personDisciples: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    }),
      builder.addCase(fetchDiscipleData.fulfilled, (state, action) => {
        state.disciple = action.payload;
      }),
      builder.addCase(fetchPersonDisciplesData.fulfilled, (state, action) => {
        state.personDisciples = action.payload;
      });
  }
});

export default appDiscipleSlice.reducer;
