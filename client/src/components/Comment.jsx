import React, { useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { removeComment, getPostComments } from '../redux/features/commentSlice'
import { toast } from 'react-toastify'
function Comment({ comments }) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
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
    return (
        <>
            {
                comments && comments.map(item => (
                    <article key={item._id} className="relative max-w-[960px] mx-auto py-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900" >
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt={item?.username} />
                                    <span className={user?._id === item.author ? 'bg-yellow-400 rounded-3xl px-3 py-0.5 font-semibold text-gray-600' : 'font-semibold text-zync-600'}>{item?.username}</span></p>
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
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                Reply
                            </button>
                        </div>
                    </article >
                ))
            }
        </>
    )
}

export default Comment