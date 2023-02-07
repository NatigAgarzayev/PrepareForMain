import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo-main.svg'
import notification from '../images/notification.svg'
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Navbar() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const userInfo = (useSelector((state) => state.auth.user) || { username: 'User', createdAt: '2023' })
    const handleDropdown = (e) => {
        e.target.parentElement.nextElementSibling.classList.toggle('hidden')
    }


    const logoutHandle = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You logged out!')
    }

    return (
        <div className='py-3 shadow-md'>
            <div className="container mx-auto px-2">
                <div className='flex items-center justify-between gap-5'>
                    <div className="md:flex items-center gap-2 ">
                        <img src={logo} alt="Connect" />
                        <h2 className='hidden md:block text-2xl font-bold'>connect</h2>
                    </div>
                    {
                        isAuth
                            ? (
                                <>
                                    <div>
                                        <form className='hidden sm:block w-full md:w-[636px]'>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                </div>
                                                <input type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                                            </div>
                                        </form>
                                    </div>
                                    <div className='flex gap-10 items-center'>
                                        <div className='hover:bg-gray-200/80 cursor-pointer rounded-full w-[40px] h-[40px] flex items-center justify-center'>
                                            <img className='relative z-10' src={notification} alt="" />
                                        </div>
                                        <div className="md:order-2 relative">
                                            <button onClick={e => handleDropdown(e)} type="button" className="w-10 h-10 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                                <img className="w-10 h-10 rounded-full" src={logo} alt="" />
                                            </button>
                                            <div className="absolute right-0 z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                                <div className="px-4 py-3">
                                                    <span className="block text-sm text-gray-900 dark:text-white font-semibold">{userInfo.username}</span>
                                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userInfo.createdAt.replace(/[a-z]/gi, " / ").split('').slice(0, -7).join('')}</span>
                                                </div>
                                                <ul className="py-2" aria-labelledby="user-menu-button">
                                                    <li className='cursor-pointer'>
                                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</p>
                                                    </li>
                                                    <li className='cursor-pointer'>
                                                        <Link to="/new"><p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add New Post</p></Link>
                                                    </li>
                                                    <li className='cursor-pointer'>
                                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</p>
                                                    </li>
                                                    <li className='cursor-pointer'>
                                                        <p onClick={logoutHandle} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div >
                                </>)
                            :
                            (<Link to="/login">
                                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Sign In</button>
                            </Link>)
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar