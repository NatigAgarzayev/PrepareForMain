import React, { useEffect, useState } from 'react'
import view from '../images/view.svg'
import chat from '../images/chat.svg'
import logo from '../images/logo-auth.svg'
import arr_up from '../images/arr_up.svg'
import arr_down from '../images/arr_down.svg'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, likeThePost, unlikeThePost } from '../redux/features/postSlice'
import { toast } from 'react-toastify'

function Posts({ posts }) {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.post.loading)
    const handlePostById = (id) => {
        navigate(`/${id}`)
    }

    const likePost = async (id) => {
        try {
            await dispatch(likeThePost(id))
            dispatch(getAllPosts())

        } catch (error) {
            toast.error('Error :[')
        }
    }

    const unlikePost = async (id) => {
        try {
            await dispatch(unlikeThePost(id))
            dispatch(getAllPosts())

        } catch (error) {
            toast.error('Error :[')
        }
    }

    useEffect(() => {
    }, [dispatch])

    return (
        <div>
            {/* {
                isLoading &&
                (
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-20 h-20 mx-auto mt-36' viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#1d3f72" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                    </div>
                )
            } */}
            {
                posts
                && posts.map(item => (
                    <div key={item._id} className="animate-[fadeIn_1s_ease-in-out] relative mb-10 shadow-lg p-[30px] flex gap-4 cursor-pointer">
                        <div className="absolute right-5 top-5">
                            <img className='w-10 h-10 rounded-full border' src={logo} alt="" />
                        </div>
                        <div className='flex justify-start'>
                            <div className="flex flex-col items-center justify-center gap-[5px]">
                                {/* <div className='cursor-pointer'>
                                    <img src={arr_up} alt="" />
                                </div>
                                <div className='cursor-pointer'>
                                    <img src={arr_down} alt="" />
                                </div> */}
                                {
                                    item.likes?.includes(user?._id)
                                        ?
                                        <svg onClick={() => unlikePost(item?._id)} xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                                        :
                                        <svg onClick={() => likePost(item?._id)} xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" /></svg>
                                }
                                <div className="text-2xl font-semibold text-zinc-500">{item.likes?.length || 0}</div>
                                {/* <div className="text-2xl font-semibold text-zinc-500">{res}</div> */}
                            </div>
                        </div>
                        <div className="w-full pr-8">
                            <h3 onClick={() => handlePostById(item._id)} className='text-zinc-600 text-2xl font-semibold'>{item.title}</h3>
                            <small className='mt-[5px] text-[16px] text-zinc-800'>
                                <Moment date={item.createdAt} format='DD MMM YYYY, hh:mm' />
                            </small>
                            <p className='text-slate-700'>Author: <span onClick={() => navigate(`/profile/${item.author}`)} className='text-slate-500 font-semibold hover:underline'>{item.username}</span></p>
                            <div onClick={() => handlePostById(item._id)} className={item.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden h-[150px]' : 'flex rounded-sm overflow-hidden'}>
                                {
                                    item.imageUrl && (
                                        <>
                                            <div className='shad absolute w-full h-full left-0 top-0'></div>
                                            <img className='object-cover w-full h-auto hover' src={`http://localhost:4444/${item.imageUrl}`} alt='' />
                                        </>
                                    )
                                }
                            </div>
                            <p onClick={() => handlePostById(item._id)} className='max-w-[666px] text-gray-400 h-12 mt-6 mb-12'>{item.text}</p>
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
            }
        </div >
    )
}

export default Posts