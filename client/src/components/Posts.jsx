import React from 'react'
import view from '../images/view.svg'
import chat from '../images/chat.svg'
import logo from '../images/logo-auth.svg'
import arr_up from '../images/arr_up.svg'
import arr_down from '../images/arr_down.svg'
import Moment from 'react-moment'

function Posts({ posts }) {
    return (
        <div>
            {
                posts.length > 0
                    ? posts.map(item => (
                        <div key={item._id} className="relative mb-10 shadow-lg p-[30px] flex gap-4 cursor-pointer">
                            <div className="absolute right-5 top-5">
                                <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                            </div>
                            <div className='flex justify-start'>
                                <div className="flex flex-col items-center justify-center gap-[5px]">
                                    <div className='cursor-pointer'>
                                        <img src={arr_up} alt="" />
                                    </div>
                                    <div className="text-2xl font-semibold text-zinc-500">0</div>
                                    <div className='cursor-pointer'>
                                        <img src={arr_down} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full pr-8">
                                <h3 className='text-zinc-600 text-2xl font-semibold'>{item.title}</h3>
                                <small className='mt-[5px] text-[16px] text-zinc-800'>
                                    <Moment date={item.createdAt} format='DD MMM YYYY, hh:mm' />
                                </small>
                                <p className='text-slate-700'>Author: <span className='text-slate-500 font-semibold hover:underline'>{item.username}</span></p>
                                <div className={item.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden h-[150px]' : 'flex rounded-sm overflow-hidden'}>
                                    {
                                        item.imageUrl && (
                                            <>
                                                <div className='shad absolute w-full h-full left-0 top-0'></div>
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
                    ))
                    :
                    (<div className='text-2xl text-center mt-20'>Not posts</div>)
            }
        </div>
    )
}

export default Posts