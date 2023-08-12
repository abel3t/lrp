import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Absence } from '@core/types';

export const fetchData = createAsyncThunk('absence/fetchData', async () => {
  const response = await apiClient.get('/absences');

  return response.data.map((absence: Absence, index: number) => ({ index: index + 1, ...absence, member: absence.person }));
});

export const fetchAbsenceData = createAsyncThunk('absence/fetchAbsenceData', async (absenceId: string) => {
  const response = await apiClient.get(`/absences/${absenceId}`);

  return response.data;
});

export const fetchSundayServiceHistories = createAsyncThunk('absence/fetchSundayServiceHistories', async (memberId: string) => {
  const response = await apiClient.get(`/absences/sunday-service-histories/members/${memberId}`);

  return response.data;
});

export const deleteAbsence = createAsyncThunk('absence/deleteAbsence', async (absenceId: string) => {
  const response = await apiClient.get(`/absences/${absenceId}`);

  return response.data;
});

export const appAbsenceSlice = createSlice({
  name: 'absence',
  initialState: {
    data: [],
    absence: {} as Absence,
    sundayServiceHistories: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchAbsenceData.fulfilled, (state, action) => {
      state.absence = action.payload;
    });

    builder.addCase(fetchSundayServiceHistories.fulfilled, (state, action) => {
      state.sundayServiceHistories = action.payload;
    });
  }
});

export default appAbsenceSlice.reducer;
