import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../utils/axios'

const initialState = {
    isLoading: false,
    user: null,
}

export const getUserById = createAsyncThunk('profile/getUserById', async (id) => {
    try {
        const {data} = await axios.get(`/profile/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const profileSlice = createSlice({
    name: 'profil',
    initialState,
    reducers: {},
    extraReducers: {
        [getUserById.pending]: (state) => {
            state.isLoading = true
        },
        [getUserById.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        [getUserById.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export default profileSlice.reducer