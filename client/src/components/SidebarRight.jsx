import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import nofound from '../images/404.gif'
function SidebarRight({ popularPosts }) {
    const isLoading = useSelector(state => state.post.loading)
    const navigate = useNavigate()
    return (
        <div>
            <div className="relative pt-20 flex flex-col h-screen bg-white shadow w-[300px]">
                <div className="space-y-3">
                    <button onClick={() => navigate('/new')} className="absolute top-6 left-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-6 h-6 mr-2 -ml-1" viewBox="0 0 448 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                        New Question
                    </button>
                    <div className="flex items-center pt-5">
                        <h2 className="ml-10 text-xl font-light uppercase">Popular Questions</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            {
                                isLoading && (
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10 mx-auto mt-24' viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                            <circle cx="50" cy="50" fill="none" stroke="#1d3f72" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                            </circle>
                                        </svg>
                                    </div>
                                )
                            }
                            {
                                popularPosts
                                    ? (popularPosts.map(item => (
                                        <Link key={item._id} to={`/${item._id}`} >
                                            <li className="animate-[fadeIn_1s_ease-in-out] rounded-sm hover:bg-blue-600/20 border-r-4 border-white hover:border-r-4 hover:border-indigo-500">
                                                <div
                                                    to="/"
                                                    className="flex items-center p-2 pl-10 space-x-3 rounded-md"
                                                >
                                                    <span className='font-bold text-gray-700 text-xl overflow-hidden text-ellipsis whitespace-nowrap w-44'>{item.title}</span>
                                                </div>
                                            </li>
                                        </Link >
                                    )))
                                    : (<img className='mx-auto w-60 h-40' src={nofound} alt="" />)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default SidebarRight