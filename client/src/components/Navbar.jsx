import React, { useRef } from 'react'
import logo from '../images/logo-main.svg'
import notification from '../images/notification.svg'
function Navbar() {
    const isAuth = false
    const handleDropdown = (e) => {
        e.target.parentElement.nextElementSibling.classList.toggle('hidden')
    }

    return (
        <div className='py-3 shadow-md'>
            <div className="container mx-auto px-2">
                <div className='flex items-center justify-between gap-5'>
                    <div className="md:flex items-center gap-2 ">
                        <img src={logo} alt="Connect" />
                        <h2 className='hidden md:block text-2xl font-bold'>connect</h2>
                    </div>
                    <div>
                        <form className='hidden sm:block w-full md:w-[636px]'>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
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
                                <img className="w-10 h-10 rounded-full" src={logo} alt="user photo" />
                            </button>
                            <div className="absolute right-0 z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </div >
    )
}

export default Navbar