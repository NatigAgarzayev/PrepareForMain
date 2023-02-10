import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../images/logo-main.svg'
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function Navbar() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const userInfo = (useSelector((state) => state.auth.user))
    const logoutHandle = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You logged out!')
    }

    return (
        <div className='py-3 shadow-md z-10 relative'>

            <div className="container mx-auto px-2">
                <div className='flex items-center justify-between gap-5'>
                    <Link to='/' className="md:flex items-center gap-2 ">
                        <img src={logo} alt="Connect" />
                        <h2 className='hidden md:block text-2xl font-bold'>Connect</h2>
                    </Link>
                    {
                        isAuth
                            ? (
                                <>
                                    <div>
                                        <div className='hidden sm:block w-full md:w-[636px]'>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                                </div>
                                                <input type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Posts" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-10 items-center'>
                                        <div className='relative hover:bg-gray-200/80 cursor-pointer rounded-full w-[40px] h-[40px] flex items-center justify-center'>
                                            <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 15C16 13.4087 15.3679 11.8826 14.2426 10.7574C13.1174 9.63214 11.5913 9 10 9C8.4087 9 6.88258 9.63214 5.75736 10.7574C4.63214 11.8826 4 13.4087 4 15C4 22 1 24 1 24H19C19 24 16 22 16 15Z" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.73 28C11.5542 28.3031 11.3019 28.5547 10.9982 28.7295C10.6946 28.9044 10.3504 28.9965 10 28.9965C9.64964 28.9965 9.30541 28.9044 9.00179 28.7295C8.69818 28.5547 8.44583 28.3031 8.27002 28" stroke="#808080" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle className="" cx="14.5" cy="7.5" r="6.5" fill="#4E9BB9" stroke="white" strokeWidth="2" />
                                            </svg>
                                            <span className="absolute animate-ping inline-flex rounded-full top-[7.2px] right-[11.5px] h-[10px] w-[10px] bg-sky-500"></span>
                                        </div>
                                        <div className="menu__btn md:order-2 relative">
                                            <button type="button" className=" w-10 h-10 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 ring-4 ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                                <img className="w-10 h-10 rounded-full" src={logo} alt="" />
                                            </button>
                                            <div className="menu__dropdown absolute top-6 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                                <div className="px-4 py-3">
                                                    <span className="block text-sm text-gray-900 dark:text-white font-semibold">{userInfo.username}</span>
                                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userInfo.createdAt.replace(/[a-z]/gi, " / ").split('').slice(0, -7).join('')}</span>
                                                </div>
                                                <ul className="py-2" aria-labelledby="user-menu-button">
                                                    <li className='cursor-pointer'>
                                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</p>
                                                    </li>
                                                    <li className='cursor-pointer'>
                                                        <Link to="/new"><p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">New Question</p></Link>
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