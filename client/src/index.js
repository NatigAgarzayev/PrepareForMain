import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { store } from './redux/store'
import { Provider } from 'react-redux'
import {ToastContainer} from 'react-toastify'


import Layout from './components/Layout'
import MainPage from './pages/MainPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import AddPostPage from './pages/AddPostPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import EditPostPage from './pages/EditPostPage';


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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position='top-left'/>
  </Provider>
);
