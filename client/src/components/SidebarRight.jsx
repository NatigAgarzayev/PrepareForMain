import React from 'react'
import { Link } from 'react-router-dom'
import nofound from '../images/404.gif'
function SidebarRight({ popularPosts }) {
    return (
        <div>
            <div className="pt-20 flex flex-col h-screen bg-white shadow w-[300px]">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="ml-10 mb-5 text-xl font-light uppercase">Popular Questions</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            {
                                popularPosts.length === 0 && (
                                    <div className='space-y-5'>
                                        <div class="pl-10 animate-pulse flex space-x-4 w-44">
                                            <div class="flex-1 space-y-6 py-1">
                                                <div class="h-3 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                        <div class="pl-10 animate-pulse flex space-x-4 w-36">
                                            <div class="flex-1 space-y-6 py-1">
                                                <div class="h-3 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                        <div class="pl-10 animate-pulse flex space-x-4 w-44">
                                            <div class="flex-1 space-y-6 py-1">
                                                <div class="h-3 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                        <div class="pl-10 animate-pulse flex space-x-4 w-36">
                                            <div class="flex-1 space-y-6 py-1">
                                                <div class="h-3 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                        <div class="pl-10 animate-pulse flex space-x-4 w-44">
                                            <div class="flex-1 space-y-6 py-1">
                                                <div class="h-3 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                popularPosts
                                    ? (popularPosts.map(item => (
                                        <Link to={`/${item._id}`} >
                                            <li key={item._id} className="animate-[fadeIn_1s_ease-in-out] rounded-sm hover:bg-blue-600/20 border-r-4 border-white hover:border-r-4 hover:border-indigo-500">
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