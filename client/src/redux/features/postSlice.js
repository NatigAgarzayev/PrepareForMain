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

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
    try {
        const {data} = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const {data} = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const likeThePost = createAsyncThunk('post/likeThePost', async (id) => {
    try {
        const {data} = await axios.post(`/posts/like/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const unlikeThePost = createAsyncThunk('post/unlikeThePost', async(id) => {
    try {
        const {data} = await axios.delete(`/posts/unlike/${id}`, id)
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
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },
        [removePost.pending]: (state) => {
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter(x => x._id !== action.payload._id)
        },
        [removePost.rejected]: (state) => {
            state.loading = false
        },
        [likeThePost.pending]: (state) => {
            state.loading = true
        },
        [likeThePost.fulfilled]: (state) => {
            state.loading = false
        },
        [likeThePost.rejected]: (state) => {
            state.loading = false
        },
        [unlikeThePost.pending]: (state) => {
            state.loading = true
        },
        [unlikeThePost.fulfilled]: (state) => {
            state.loading = false
        },
        [unlikeThePost.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default postSlice.reducer