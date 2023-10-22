import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from '@core/services/api.client';
import { Friend } from '@core/types';
import { convertObjectToQueryString } from '../@core/utils/string.util';

interface IQueryFriend {
  search?: string;
}

export const fetchData = createAsyncThunk('friend/fetchData', async (query?: IQueryFriend) => {
  const response = await apiClient.get('/friends' + convertObjectToQueryString(query));

  return response.data.map((friend: Friend, index: number) => ({ index: index + 1, ...friend }));
});

export const fetchFriendData = createAsyncThunk('friend/fetchFriendData', async (friendId: string) => {
  const response = await apiClient.get(`/friends/${friendId}`);

  return response.data;
});

export const deleteFriend = createAsyncThunk('friend/deleteFriend', async (friendId: string) => {
  const response = await apiClient.get(`/friends/${friendId}`);

  return response.data;
});

// export const deleteFriend = createAsyncThunk(
//   'appFriend/deleteData',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await apiClient.delete('/apps/friend/delete', {
//       data: id
//     })
//     await dispatch(fetchData(getState().friend.params))
//
//
//     return response.data
//   }
// )

export const appFriendSlice = createSlice({
  name: 'friend',
  initialState: {
    data: [],
    friend: {} as Friend
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchFriendData.fulfilled, (state, action) => {
      state.friend = action.payload;
    });
  }
});

export default appFriendSlice.reducer;
