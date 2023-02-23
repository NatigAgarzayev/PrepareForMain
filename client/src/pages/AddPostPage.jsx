import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost } from '../redux/features/postSlice'
import { Helmet } from 'react-helmet'
import { checkIsAuth } from '../redux/features/authSlice'
function AddPostPage() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let val1 = useRef()
    let val2 = useRef()
    const submitHandler = () => {
        if (title.trim() === '') {
            val1.current.focus()
            toast.warning('Please write title!')
            return
        }
        if (text.trim() === '') {
            val2.current.focus()
            toast.warning('Please write text!')
            return
        }
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
        } catch (error) {
            toast.error(error)
        }
    }



    return (
        <div className='py-20 dark:bg-gray-600'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>New question  </title>
            </Helmet>
            <div className="container mx-auto px-5">
                <h1 className='text-5xl font-semibold dark:text-white'>Add New Post</h1>
                <form className='mt-10'>
                    <div className="grid md:grid-cols-1 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input onChange={e => setTitle(e.target.value)} ref={val1} value={title} type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Title"></input>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
                            <input onChange={e => setImage(e.target.files[0])} className="p-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            <div className="flex object-cover py-2">
                                {
                                    image && (
                                        <img src={URL.createObjectURL(image)} alt={image.name} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea ref={val2} value={text} onChange={e => setText(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <div className='flex gap-5'>
                        <button disabled={isAuth ? false : true} type='button' onClick={submitHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-75">Add Post</button>
                        <button onClick={() => navigate('/')} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600">Cancel</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddPostPage