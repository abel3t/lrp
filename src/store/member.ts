// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../@core/services/api.client'
import { Member } from '../@core/types'
import { convertObjectToQueryString } from '../@core/utils/string.util';

interface IQueryMember {
  search?: string
  curatorId?: string
}

export const fetchData = createAsyncThunk('member/fetchData', async (query?: IQueryMember) => {

  const response = await apiClient.get('/members' + convertObjectToQueryString(query))

  return response.data.map((member: Member, index: number) => ({ index: index + 1, ...member }))
})

export const fetchMemberData = createAsyncThunk('member/fetchMemberData', async (memberId: string) => {
  const response = await apiClient.get(`/members/${memberId}`)

  return response.data
})

// export const deleteMember = createAsyncThunk(
//   'appMember/deleteData',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await apiClient.delete('/apps/member/delete', {
//       data: id
//     })
//     await dispatch(fetchData(getState().member.params))
//
//
//     return response.data
//   }
// )

export const appMemberSlice = createSlice({
  name: 'member',
  initialState: {
    data: [],
    member: {} as Member
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    }),
      builder.addCase(fetchMemberData.fulfilled, (state, action) => {
        state.member = action.payload
      })
  }
})

export default appMemberSlice.reducer
