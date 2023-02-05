import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from './pages/login/Login';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
