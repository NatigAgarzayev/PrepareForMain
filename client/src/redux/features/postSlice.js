import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../utils/axios'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
    try {
        const {data} = await axios.post('/posts', params)
        return data
    } catch (error) {
        console.log(error)
    }
})
export const getPosts = createAsyncThunk('post/getPosts', async () => {
    try {
        const {data} = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{

    },
    extraReducers: {
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.loading = false
        },
        [getPosts.pending]: (state) => {
            state.loading = true
        },
        [getPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload
        },
        [getPosts.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default postSlice.reducer