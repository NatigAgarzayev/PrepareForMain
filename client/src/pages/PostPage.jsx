import React, { useCallback, useEffect, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import view from '../images/view.svg'
import chat from '../images/chat.svg'
import logo from '../images/logo-auth.svg'
import Moment from 'react-moment'
import { Link, useParams } from 'react-router-dom'
import axios from '../utils/axios'
function PostPage() {
    const { id } = useParams()
    const [item, setItem] = useState({})
    const fetchPosts = useCallback(async () => {
        await axios.get(`/posts/${id}`)
            .then(res => setItem(res.data))
    }, [id])
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])
    return (
        <div className='flex calc__height'>
            <div>
                <SidebarLeft />
            </div>
            <div className="relative flex-1">
                {
                    !item && (
                        <div class="shadow rounded-md max-w-sm min-w-full h-[270px] p-[30px] mx-auto mb-10">
                            <div class="animate-pulse flex space-x-4">
                                <div class="flex-1 space-y-6 py-1">
                                    <div class="h-6 bg-slate-200 rounded"></div>
                                    <div class="space-y-10">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="h-6 bg-slate-200 rounded col-span-2"></div>
                                        </div>
                                        <div class="h-6 bg-slate-200 rounded col-span-1"></div>
                                        <div class="h-6 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                            </div>
                        </div>
                    )
                }
                {
                    item && (
                        <>
                            <Link to="/" type="button" className="mt-5 ml-5 mb-5 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                <svg aria-hidden="true" class="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </Link>
                            <div className='animate-[fadeIn_1s_ease-in-out] h-full px-2 pb-20 overflow-y-scroll'>
                                <div key={item._id} className="relative mb-10 shadow-lg p-[30px] flex gap-4">
                                    <div className="absolute right-5 top-5">
                                        <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                                    </div>
                                    <div className="w-full pr-8">
                                        <h3 className='text-zinc-600 text-2xl font-semibold'>{item.title}</h3>
                                        <small className='mt-[5px] text-[16px] text-zinc-800'>
                                            <Moment date={item.createdAt} format='DD MMM YYYY, hh:mm' />
                                        </small>
                                        <p className='text-slate-700'>Author: <span className='text-slate-500 font-semibold cursor-pointer hover:underline'>{item.username}</span></p>
                                        <div className={item.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden' : 'flex rounded-sm overflow-hidden'}>
                                            {
                                                item.imageUrl && (
                                                    <>
                                                        <img className='object-cover w-1/2 h-auto' src={`http://localhost:4444/${item.imageUrl}`} alt='' />
                                                    </>
                                                )
                                            }
                                        </div>
                                        <p className='max-w-[666px] text-gray-400 h-12 mt-6 mb-12'>{item.text}</p>
                                    </div>
                                    <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                                        <div className="flex gap-2 items-center">
                                            <img src={view} alt="" />
                                            <span className='text-gray-900/50 font-semibold'>{item.views}</span>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <img src={chat} alt="" />
                                            <span className='text-gray-900/50 font-semibold'>{item.comments?.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default PostPage