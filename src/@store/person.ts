import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Person } from '@core/types';
import { convertObjectToQueryString } from '@core/utils/string.util';

interface IQueryPerson {
  search?: string;
  curatorId?: string;
}

export const fetchData = createAsyncThunk('person/fetchData', async (query?: IQueryPerson) => {
  const response = await apiClient.get('/people' + convertObjectToQueryString(query));

  return response.data.map((person: Person, index: number) => ({ index: index + 1, ...person }));
});

export const fetchPersonData = createAsyncThunk('person/fetchPersonData', async (personId: string) => {
  const response = await apiClient.get(`/people/${personId}`);

  return response.data;
});

export const deletePerson = createAsyncThunk('person/deletePerson', async (personId: string) => {
  const response = await apiClient.delete(`/people/${personId}`);

  return response.data;
});

// export const deletePerson = createAsyncThunk(
//   'appPerson/deleteData',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await apiClient.delete('/apps/person/delete', {
//       data: id
//     })
//     await dispatch(fetchData(getState().person.params))
//
//
//     return response.data
//   }
// )

export const appPersonSlice = createSlice({
  name: 'person',
  initialState: {
    data: [],
    person: {} as Person
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchPersonData.fulfilled, (state, action) => {
      state.person = action.payload;
    });
  }
});

export default appPersonSlice.reducer;
