import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import commentReducer from './features/commentSlice'
import postReducer from './features/postSlice'
import profileReducer from './features/profileSlice'
import followersReducer from './features/followersSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    profile: profileReducer,
    followers: followersReducer
  },
})