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

// ** Fetch Members
export const fetchData = createAsyncThunk('member/fetchData', async (params: DataParams) => {
  const response = await apiClient.get('/members')

  console.log(response.data, 'data')

  return response.data
})

export const deleteMember = createAsyncThunk(
  'appMember/deleteData',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiClient.delete('/apps/member/delete', {
      data: id
    })
    await dispatch(fetchData(getState().member.params))


    return response.data
  }
)

export const appMemberSlice = createSlice({
  name: 'member',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.members
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appMemberSlice.reducer
