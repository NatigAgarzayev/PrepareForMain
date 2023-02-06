import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { getMe } from '../redux/features/authSlice'
import Navbar from './Navbar'
function Layout() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMe())
    })
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
        </React.Fragment>
    )
}

export default Layout