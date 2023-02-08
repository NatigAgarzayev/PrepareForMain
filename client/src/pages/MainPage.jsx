import React, { useEffect } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import clock from '../images/clock.svg'
import arrow from '../images/arrow.svg'
import SidebarRight from '../components/SidebarRight'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/postSlice'
import Posts from '../components/Posts'
function MainPage() {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className='flex gap-5 calc__height'>
            <div className="">
                <SidebarLeft />
            </div>
            <div className="flex-1">
                <div className="fixed top-24 ml-10 flex gap-10 items-center">
                    <button data-id="1" type="button" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3">
                        <img src={clock} alt="" />
                        <span className='text-[18px] font-normal'>New</span>
                    </button>
                    <button data-id="2" type="button" className="text-white bg-slate-300 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3">
                        <img src={arrow} alt="" />
                        <span className='text-[18px] font-normal'>Trending</span>
                    </button>
                </div>
                <div className='mt-20 h-full px-2 pb-20 pt-10 overflow-y-scroll'>
                    <Posts posts={posts} />
                </div>
            </div>
            <div className="w-[300px] hidden lg:block">
                <SidebarRight popularPosts={popularPosts} />
            </div>
        </div>
    )
}
// bg-cyan-600
export default MainPage