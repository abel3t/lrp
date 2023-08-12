import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Member } from '@core/types';
import { convertObjectToQueryString } from '@core/utils/string.util';

interface IQueryMember {
  search?: string;
  curatorId?: string;
}

export const fetchData = createAsyncThunk('member/fetchData', async (query?: IQueryMember) => {
  const response = await apiClient.get('/members' + convertObjectToQueryString(query));

  return response.data.map((member: Member, index: number) => ({ index: index + 1, ...member }));
});

export const fetchMemberData = createAsyncThunk('member/fetchMemberData', async (memberId: string) => {
  const response = await apiClient.get(`/members/${memberId}`);

  return response.data;
});

export const fetchPersonFriendsData = createAsyncThunk('person/fetchPersonFriendsData', async (personId: string) => {
  const response = await apiClient.get(`/members/${personId}/friends`);

  return response.data?.map((friend: Member, index: number) => ({ index: index + 1, ...friend }));
});

export const deleteMember = createAsyncThunk('member/deleteMember', async (memberId: string) => {
  const response = await apiClient.delete(`/members/${memberId}`);

  return response.data;
});

export const appMemberSlice = createSlice({
  name: 'member',
  initialState: {
    data: [],
    friends: [],
    member: {} as Member
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchPersonFriendsData.fulfilled, (state, action) => {
      state.friends = action.payload;
    });

    builder.addCase(fetchMemberData.fulfilled, (state, action) => {
      state.member = action.payload;
    });
  }
});

export default appMemberSlice.reducer;
