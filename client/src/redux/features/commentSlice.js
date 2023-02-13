import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../utils/axios"

const initialState = {
    comments: [],
    loading: false
}

export const createComment = createAsyncThunk('comment/createComment', async({postId, comment, parentId}) => {
    try {
        const {data} = await axios.post(`/comments/${postId}`, {
            postId,
            comment,
            parentId
        })   
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
    try {
        const {data} = await axios.get(`/posts/comments/${postId}`)
        return data
    } catch (error) {
        console.log(error)
    }
})


export const removeComment = createAsyncThunk('comment/removeComment', async({ id, postId }) => {
    try {
        const {data} = await axios.delete(`/comments/${id}`, {data: {id,postId}})
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        [getPostComments.pending]: (state) => {
            state.loading = true
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = action.payload
        },
        [getPostComments.rejected]: (state) => {
            state.loading = false
        },
        [removeComment.pending]: (state) => {
            state.loading = true
        },
        [removeComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments = state.comments.filter(x => x._id !== action.payload._id)
        },
        [removeComment.rejected]: (state) => {
            state.loading = false
        }
    }
})

export default commentSlice.reducer