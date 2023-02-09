import React, { useCallback, useEffect, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import view from '../images/view.svg'
import chat from '../images/chat.svg'
import logo from '../images/logo-auth.svg'
import Moment from 'react-moment'
import { useParams } from 'react-router-dom'
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
        <div className='flex'>
            <div>
                <SidebarLeft />
            </div>
            <div className="flex-1">
                {
                    item && (
                        <div className='mt-20 h-full px-2 pb-20 pt-10 overflow-y-scroll'>
                            <div key={item._id} className="relative mb-10 shadow-lg p-[30px] flex gap-4 cursor-pointer">
                                <div className="absolute right-5 top-5">
                                    <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                                </div>
                                <div className="w-full pr-8">
                                    <h3 className='text-zinc-600 text-2xl font-semibold'>{item.title}</h3>
                                    <small className='mt-[5px] text-[16px] text-zinc-800'>
                                        <Moment date={item.createdAt} format='DD MMM YYYY, hh:mm' />
                                    </small>
                                    <p className='text-slate-700'>Author: <span className='text-slate-500 font-semibold hover:underline'>{item.username}</span></p>
                                    <div className={item.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden' : 'flex rounded-sm overflow-hidden'}>
                                        {
                                            item.imageUrl && (
                                                <>
                                                    <img className='object-cover w-full h-auto' src={`http://localhost:4444/${item.imageUrl}`} alt='' />
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
                    )
                }
            </div>
        </div>
    )
}

export default PostPage