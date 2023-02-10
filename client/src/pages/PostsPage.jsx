import React, { useEffect, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import Posts from '../components/Posts'
import axios from '../utils/axios'
import nofound from '../images/404.gif'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
function PostsPage() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const isLoading = useSelector(state => state.post.loading)
    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMyPosts()
    }, [])
    return (
        <div className='flex gap-5 calc__height'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My questions</title>
            </Helmet>
            <div className="">
                <SidebarLeft />
            </div>
            <div className='flex-1 h-full px-2 overflow-y-scroll'>
                <div className='flex items-center gap-5'>
                    <button onClick={() => navigate(-1)} type="button" className=" text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                        <svg aria-hidden="true" class="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <h1 className='text-5xl py-10 font-bold'>My Questions</h1>
                </div>
                {
                    <Posts posts={posts} />
                }
                {
                    !isLoading && posts.length === 0 && (
                        <div className='max-w-fit mx-auto'>
                            <img className='w-90 h-80' src={nofound} alt="" />
                            <Link to="/new" className="flex justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-3.5 text-center" >Add Question</Link>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default PostsPage