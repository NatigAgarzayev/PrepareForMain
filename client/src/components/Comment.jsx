import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { removeComment, getPostComments } from '../redux/features/commentSlice'
import { createComment } from '../redux/features/commentSlice'
import { toast } from 'react-toastify'
import { checkIsAuth } from '../redux/features/authSlice'
import Replies from './Replies'
function Comment({ comments }) {
    const { id } = useParams()
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [comment, setComment] = useState()
    const inp = useRef()
    useEffect(() => {
        document.addEventListener("click", handleCommentMenu, true)
    }, [])
    const postId = id
    const handleDeleteComment = async (id) => {
        try {
            await dispatch(removeComment({ id, postId }))
            toast('Question deleted!')
            dispatch(getPostComments(postId))
        } catch (error) {
            console.log(error)
        }
    }
    const handleCommentMenu = (e) => {
        if (e.target.classList.contains('btn-trigger')) {
            if (e.target.parentElement.classList.contains('btn-trigger') && e.target.tagName !== 'path') {
                e.target.parentElement.parentElement.children[2].classList.remove('hidden')
            }
            if (e.target.parentElement.classList.contains('btn-trigger') && e.target.tagName === 'path') {
                e.target.parentElement.parentElement.parentElement.children[2].classList.remove('hidden')
            }
            if (e.target.parentElement.tagName === 'FOOTER' && e.target.tagName === 'BUTTON') {
                e.target.parentElement.children[2].classList.remove('hidden')
            }
        }
        else {
            document.querySelectorAll('.drop').forEach(el => {
                el.classList.add('hidden')
            });
        }
    }
    const handlingReply = (parentComm) => {
        if (comment.trim() === '') {
            toast.warning("Reply can't be empty!")
            return
        }
        try {
            inp.current.classList.add('hidden')
            const postId = id
            const parentId = parentComm
            dispatch(createComment({ postId, comment, parentId }))
            comment('')
            toast.success("Reply added : )")
        } catch (error) {
            console.log(error)
        }
    }

    const handleReplyInput = (e) => {
        document.querySelectorAll('.inp').forEach(item => {
            item.classList.add('hidden')
        })
        e.target.parentElement.nextElementSibling.classList.remove('hidden')
    }
    const handleClose = (e) => {
        e.target.parentElement.parentElement.classList.add('hidden')
    }
    return (
        <>
            {
                comments && comments
                    .filter(item => item?.parentId === null)
                    .map(item => (
                        <article key={item._id} className="relative max-w-[960px] mx-auto py-6 text-base bg-white border-l-2 border-gray-200 pl-4 mb-6 dark:border-gray-700 dark:bg-gray-900" >
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                        <img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt={item?.username} />
                                        <span onClick={() => navigate(`/profile/${item.author}`)} className={user?._id === item.author ? 'bg-yellow-400 rounded-3xl px-3 py-0.5 font-semibold text-gray-600 cursor-pointer' : 'font-semibold text-zync-600 cursor-pointer'}>{item?.username}</span></p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <Moment date={item?.createdAt} format='DD MMM YYYY, hh:mm' />
                                    </p>
                                </div>
                                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                    className="btn-trigger inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                    type="button">
                                    <svg className="btn-trigger w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            className='btn-trigger'
                                            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                        </path>
                                    </svg>
                                </button>
                                <div
                                    className="drop absolute hidden right-10 top-16 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownMenuIconHorizontalButton">
                                        {
                                            user?._id === item.author && (
                                                <li onClick={() => handleDeleteComment(item._id)}>
                                                    <p className="block py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</p>
                                                </li>
                                            )
                                        }
                                        <li>
                                            <Link to="/"
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</Link>
                                        </li>
                                    </ul>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">{item?.comment}</p>
                            <div className="flex items-center mt-4 space-x-4">
                                <button onClick={(e) => handleReplyInput(e)} type="button"
                                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                    Reply
                                </button>
                            </div>
                            <div ref={inp} className='inp hidden'>
                                <form className='mb-6 mt-6 max-w-[910px] ml-auto'>
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea id="comment" rows="2"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a reply..."></textarea>
                                    </div>
                                    <button
                                        disabled={isAuth ? false : true}
                                        type='button'
                                        onClick={() => handlingReply(item._id)}
                                        className="bg-blue-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                        Reply
                                    </button>
                                    <button
                                        type='button'
                                        onClick={(e) => handleClose(e)}
                                        className="ml-5 bg-red-500 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-75">
                                        Cancel
                                    </button>
                                </form>
                            </div>

                            {
                                comments.map(reply => (
                                    <Replies key={reply._id} reply={reply} replyId={reply.parentId} item={item} itemId={item._id} />
                                ))
                            }
                        </article >
                    ))
            }
        </>
    )
}

export default Comment