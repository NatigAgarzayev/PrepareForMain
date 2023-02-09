import React, { useEffect } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  import { useDispatch } from 'react-redux';
  import { getMe } from './redux/features/authSlice';
  import {ToastContainer} from 'react-toastify'
  import Layout from './components/Layout'
import MainPage from './pages/MainPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import AddPostPage from './pages/AddPostPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import EditPostPage from './pages/EditPostPage'


 const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MainPage />
        },
        {
          path: "/posts",
          element: <PostsPage />
        },
        {
          path: "/:id",
          element: <PostPage />
        },
        {
          path: "/:id/edit",
          element: <EditPostPage />
        },
        {
          path: "/new",
          element: <AddPostPage />
        },
      ]
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
  ]);

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right'/>
    </>
  )
}

export default App