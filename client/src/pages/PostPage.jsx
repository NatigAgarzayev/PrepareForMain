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
import { checkIsAuth } from '../redux/features/authSlice'
function PostPage() {
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
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
            toast.success('Post deleted!')
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
            const parentId = null
            dispatch(createComment({ postId, comment, parentId }))
            setComment('')
            toast("Comment added : )")
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(() => {
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
                <title>{item?.title || 'Question'}</title>
            </Helmet>
            <div>
                <SidebarLeft />
            </div>
            <div className="relative flex-1 dark:bg-gray-600">
                <>
                    {
                        item && (
                            <>
                                <button onClick={() => navigate(-1)} type="button" className="mt-5 ml-5 mb-5 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <div className='animate-[fadeIn_1s_ease-in-out] h-full px-2 pb-20 overflow-y-scroll '>
                                    <div key={item?._id} className="relative mb-10 border p-[30px] flex gap-4 rounded-lg dark:bg-gray-800">
                                        <div className="absolute right-5 top-5">
                                            <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                                        </div>
                                        <div className="w-full pr-8">
                                            <h3 className='text-zinc-600 text-2xl font-semibold dark:text-white'>{item.title}</h3>
                                            <small className='mt-[5px] text-[16px] text-zinc-800 dark:text-white'>
                                                <Moment date={item.createdAt} format='DD MMM YYYY, hh:mm' />
                                            </small>
                                            <p className='text-slate-700 dark:text-white/90'>Author: <span onClick={() => navigate(`/profile/${item?.author}`)} className='text-slate-500 font-semibold cursor-pointer hover:underline dark:text-white'>{item?.username}</span></p>
                                            <div className={item?.imageUrl ? 'relative mt-5 flex rounded-sm overflow-hidden' : 'flex rounded-sm overflow-hidden'}>
                                                {
                                                    item?.imageUrl && (
                                                        <>
                                                            <img className='object-cover w-1/2 h-auto' src={`http://localhost:4444/${item.imageUrl}`} alt='' />
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <p className='max-w-[75%] text-gray-400 mt-6 mb-12 dark:text-white/60'>{item.text}</p>
                                        </div>
                                        <div className='absolute bottom-5'>
                                            {
                                                user?._id === item?.author && (
                                                    <button onClick={handleDelete} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                                                )
                                            }
                                        </div>
                                        <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                                            <div className="flex gap-3 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-6 h-6 dark:fill-white/70'><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" /></svg>
                                                <span className='text-gray-900/50 font-semibold dark:text-white/90'>{item?.views}</span>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 dark:fill-white/70' viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                                                <span className='text-gray-900/50 font-semibold dark:text-white/90'>{item.comments?.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='max-w-[960px] mx-auto'>
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
                                                disabled={isAuth ? false : true}
                                                type='button'
                                                onClick={handleComment}
                                                className="bg-blue-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                                Post comment
                                            </button>
                                        </form>
                                    </div>
                                    <div className='pt-10 pb-20'><Comment comments={comments} /></div>
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