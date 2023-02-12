import React, { useEffect, useMemo, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import clock from '../images/clock.svg'
import arrow from '../images/arrow.svg'
import SidebarRight from '../components/SidebarRight'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/postSlice'
import Posts from '../components/Posts'
import { Helmet } from "react-helmet";
function MainPage() {
    const dispatch = useDispatch()
    const [sorted, setSorted] = useState(false)
    let { posts, popularPosts } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className='flex gap-5 calc__height'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>connect.com  </title>
            </Helmet>
            <div className="">
                <SidebarLeft />
            </div>
            <div className="flex-1">
                <div className="fixed top-24 ml-10 flex gap-10 items-center">
                    <button onClick={() => setSorted(false)} data-id="1" type="button" className={sorted ? "text-white bg-slate-300 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3" : "text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3"}>
                        <img className='' src={clock} alt="" />
                        <span className='text-[18px] font-normal'>New</span>
                    </button>
                    <button onClick={() => setSorted(true)} data-id="2" type="button" className={sorted ? "text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3" : "text-white bg-slate-300 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3"}>
                        <img src={arrow} alt="" />
                        <span className='text-[18px] font-normal'>Trending</span>
                    </button>
                </div>
                <div className='mt-20 h-full px-2 pb-20 overflow-y-scroll'>
                    {
                        !sorted
                            ?
                            <Posts posts={posts} />
                            :
                            <Posts posts={posts = posts.slice().sort((a, b) => b.views - a.views)} />
                    }
                </div>
            </div>
            <div className="w-[300px] hidden lg:block">
                <SidebarRight popularPosts={popularPosts} />
            </div>
        </div >
    )
}
// bg-cyan-600
export default MainPage