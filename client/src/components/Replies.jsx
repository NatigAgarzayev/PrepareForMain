import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { removeComment, getPostComments } from '../redux/features/commentSlice'
import { toast } from 'react-toastify'
function Replies({ reply, replyId, item, itemId }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
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

    return (
        <>
            {
                replyId === itemId && (
                    <article className="relative max-w-[930px] bg-white border-l-2 pl-4 border-gray-200 ml-auto py-6 mb-6 mt-6 text-base" >
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt={reply?.username} />
                                    <span onClick={() => navigate(`/profile/${reply.author}`)} className={user?._id === reply.author ? 'bg-yellow-400 rounded-3xl px-3 py-0.5 font-semibold text-gray-600 cursor-pointer' : 'font-semibold text-zync-600 cursor-pointer'}>{reply?.username}</span></p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <Moment date={reply?.createdAt} format='DD MMM YYYY, hh:mm' />
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
                                        user?._id === reply.author && (
                                            <li onClick={() => handleDeleteComment(reply._id)}>
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
                        <p className="text-gray-500 dark:text-gray-400">{reply?.comment}</p>
                    </article >
                )
            }
        </>
    )
}

export default Replies