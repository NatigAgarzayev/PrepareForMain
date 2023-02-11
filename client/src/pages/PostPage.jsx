import React, { useCallback, useEffect, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import view from '../images/view.svg'
import chat from '../images/chat.svg'
import logo from '../images/logo-auth.svg'
import Moment from 'react-moment'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { removePost } from '../redux/features/postSlice'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import Comment from '../components/Comment'
import { createComment, getPostComments } from '../redux/features/commentSlice'
function PostPage() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const isLoading = useSelector(state => state.post.loading)
    const { comments } = useSelector(state => state.comment)
    const navigate = useNavigate()
    const { id } = useParams()
    const [item, setItem] = useState({})
    const [comment, setComment] = useState('')
    const handleDelete = async () => {
        try {
            await dispatch(removePost(id))
            toast('Question deleted!')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    const fetchPosts = useCallback(async () => {
        await axios.get(`/posts/${id}`)
            .then(res => setItem(res.data))
    }, [id])
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const handleComment = () => {
        if (comment.trim() === '') {
            toast("Comment can't be empty!")
            return
        }
        try {
            const postId = id
            dispatch(createComment({ postId, comment }))
            setComment('')
            toast("Comment added : )")
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(id))
        } catch (error) {
            toast(error)
        }
    }, [id, dispatch])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])

    return (
        <div className='flex calc__height'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{item.title || 'Question'}</title>
            </Helmet>
            <div>
                <SidebarLeft />
            </div>
            <div className="relative flex-1">
                <>
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
                        item && (
                            <>
                                <button onClick={() => navigate(-1)} type="button" className="mt-5 ml-5 mb-5 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
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
                                            {
                                                user?._id === item.author && (
                                                    <button onClick={handleDelete} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
                                                )
                                            }
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
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length || 0})</h2>
                                    </div>
                                    <form className="mb-6">
                                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                            <label htmlFor="comment" className="sr-only">Your comment</label>
                                            <textarea id="comment" rows="6"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                placeholder="Write a comment..."></textarea>
                                        </div>
                                        <button
                                            type='button'
                                            onClick={handleComment}
                                            className="bg-blue-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                            Post comment
                                        </button>
                                    </form>
                                    <Comment comments={comments} />
                                </div>
                            </>
                        )
                    }
                </>
            </div>
        </div >
    )
}

export default PostPage