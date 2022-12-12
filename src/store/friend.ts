// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../@core/services/api.client';

interface DataParams {
  q: string
  dates?: Date[]
  status: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Friends
export const fetchData = createAsyncThunk('friend/fetchData', async (params: DataParams) => {
  const response = await apiClient.get('/friends')

  console.log(response.data, 'data')

  return response.data
})

export const deleteFriend = createAsyncThunk(
  'appFriend/deleteData',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiClient.delete('/apps/friend/delete', {
      data: id
    })
    await dispatch(fetchData(getState().friend.params))


    return response.data
  }
)

export const appFriendSlice = createSlice({
  name: 'friend',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  }
})

export default appFriendSlice.reducer
