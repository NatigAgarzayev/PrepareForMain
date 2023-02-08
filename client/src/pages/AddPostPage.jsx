import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPost } from '../redux/features/postSlice'

function AddPostPage() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let val1 = useRef()
    let val2 = useRef()
    const submitHandler = () => {
        if (title.trim() === '') {
            val1.current.focus()
            toast('Please write title!')
            return
        }
        if (text.trim() === '') {
            val2.current.focus()
            toast('Please write text!')
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
            toast(error)
        }
    }



    return (
        <div className='py-20'>
            <div className="container mx-auto px-5">
                <h1 className='text-5xl font-semibold'>Add Your Post</h1>
                <form className='mt-10'>
                    <div className="grid md:grid-cols-1 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input ref={val1} value={title} onChange={e => setTitle(e.target.value)} type="text" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
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
                        <button type='button' onClick={submitHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Post</button>
                        <button onClick={() => navigate('/')} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddPostPage