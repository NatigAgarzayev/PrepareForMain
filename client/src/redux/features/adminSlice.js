import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axiosadmin'

const initialState = {
    admin: null,
    token: null,
    isLoading: false,
    status: null
  }

export const loginAdmin = createAsyncThunk('admin/loginAdmin', async ({username, password}) => {
try {
    const {data} = await axios.post('/admin/auth', {
        username,
        password
    })
    if(data.token){
        window.sessionStorage.setItem('admin', data.token)
    }
    return data
    } catch (error) {
        console.log(error)
    }
})

export const getAdmin = createAsyncThunk('admin/getAdmin', async () => {
    try {
        const {data} = await axios.get('/admin/me')
        return data
    } catch (error) {
        console.log(error)
    }
})


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
      logout: (state) => {
          state.admin = null
          state.token = null
          state.isLoading = false
          state.status = null
      }
  },
  extraReducers: {
      [loginAdmin.pending]: (state) => {
          state.isLoading = true
          state.status = null
          
      },
      [loginAdmin.fulfilled]: (state, action) => {
          state.isLoading = false
          state.status = action.payload.message
          state.admin = action.payload.admin
          state.token = action.payload.token
      },
      [loginAdmin.rejected]: (state, action) => {
          state.status = action.payload.status
          state.isLoading = false
      },
    [getAdmin.pending]: (state) => {
        state.isLoading = true
        state.status = null
    },
    [getAdmin.fulfilled]: (state, action) => {
        state.isLoading = false
        state.status = null
        state.admin = action.payload?.admin
        state.token = action.payload?.token
    },
    [getAdmin.rejected]: (state, action) => {
        state.status = action.payload.status
        state.isLoading = false
    }
    }
})

export const isAdminHere = (state) => Boolean(state.admin.token)

export const {logout} = adminSlice.actions

export default adminSlice.reducer