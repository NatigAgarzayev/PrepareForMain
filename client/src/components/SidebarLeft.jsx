import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/authSlice'
import { toast } from 'react-toastify'
import premium_team from '../images/premium-team.png'
import upgrade from '../images/upgrade.svg'
function SidebarLeft() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('You logged out!')
    }
    return (
        <div>
            {
                isAuth
                    ? (<div className="pt-20 flex flex-col h-screen bg-white shadow w-[300px]">
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <h2 className="ml-16 text-xl font-light uppercase">Menu</h2>
                            </div>
                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <NavLink
                                            to="/"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className='font-bold text-gray-700'>Questions</span>
                                        </NavLink>
                                    </li>
                                    <li className="rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <NavLink
                                            to="/"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="#374151"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            <span className='font-bold text-gray-700'>Settings</span>
                                        </NavLink>
                                    </li>
                                    <li className="rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <NavLink
                                            onClick={handleLogout}
                                            to="/login"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="#374151"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            <span className='font-bold text-gray-700'>Logout</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>


                            <div className="flex items-center">
                                <h2 className="ml-16 text-xl font-light uppercase">Personal</h2>
                            </div>
                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <NavLink
                                            to="/posts"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='font-bold text-gray-700'>My Questions</span>
                                        </NavLink>
                                    </li>
                                    <li className="flex items-center rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <NavLink
                                            to="/"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28 13H22V26H28C28.2652 26 28.5196 25.8946 28.7071 25.7071C28.8946 25.5196 29 25.2652 29 25V14C29 13.7348 28.8946 13.4804 28.7071 13.2929C28.5196 13.1054 28.2652 13 28 13V13Z" stroke="#374151" strokeWidth="3.00322" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22 13L17 3C15.9391 3 14.9217 3.42143 14.1716 4.17157C13.4214 4.92172 13 5.93913 13 7V10H5.2625C4.97891 9.9993 4.69846 10.0593 4.43998 10.176C4.1815 10.2926 3.95098 10.4632 3.7639 10.6764C3.57682 10.8895 3.43752 11.1402 3.35535 11.4116C3.27318 11.683 3.25004 11.9689 3.2875 12.25L4.7875 24.25C4.84819 24.7317 5.08204 25.1749 5.44544 25.4969C5.80884 25.8189 6.27697 25.9977 6.7625 26H22" stroke="#374151" strokeWidth="3.00322" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className='font-bold text-gray-700'>My Likes</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex-1 pt-28 pl-3">
                                <div className="w-[270px] h-[270px] bg-cyan-600/30 rounded-xl">
                                    <img className='-translate-y-16 mx-auto' src={premium_team} alt="" />
                                    <div className='-mt-14'>
                                        <p className='text-center font-medium text-xl mb-5'>Upgrade to Premium</p>
                                        <button type="button" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3">
                                            <img src={upgrade} alt="" />
                                            <span className='text-xl font-normal'>Upgrade Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    :
                    (<div className="relative pt-20 flex flex-col h-screen bg-white shadow w-[300px]">
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <h2 className="ml-16 text-xl font-light uppercase">Menu</h2>
                            </div>
                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <Link
                                            to="/login"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='font-bold text-gray-700'>Login</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm hover:bg-blue-600/20 border-l-4 border-white hover:border-l-4 hover:border-indigo-500">
                                        <Link
                                            to="/register"
                                            className="flex items-center p-2 pl-16 space-x-3 rounded-md"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#374151" />
                                                <path d="M16 18V17C16.6922 17 17.3689 16.7947 17.9445 16.4101C18.5201 16.0256 18.9687 15.4789 19.2336 14.8394C19.4985 14.1999 19.5678 13.4961 19.4327 12.8172C19.2977 12.1383 18.9644 11.5146 18.4749 11.0251C17.9854 10.5356 17.3617 10.2023 16.6828 10.0673C16.0039 9.9322 15.3001 10.0015 14.6606 10.2664C14.0211 10.5313 13.4744 10.9799 13.0899 11.5555C12.7053 12.1311 12.5 12.8078 12.5 13.5" stroke="#374151" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <span className='font-bold text-gray-700'>Sign Up</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex-1 absolute bottom-28 pl-3">
                                <div className="w-[270px] h-[270px] bg-cyan-600/30 rounded-xl">
                                    <img className='-translate-y-16 mx-auto' src={premium_team} alt="" />
                                    <div className='-mt-14'>
                                        <p className='text-center font-medium text-xl mb-5'>Upgrade to Premium</p>
                                        <button type="button" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3">
                                            <img src={upgrade} alt="" />
                                            <span className='text-xl font-normal'>Upgrade Now</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default SidebarLeft