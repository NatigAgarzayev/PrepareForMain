import React, { useEffect, useState } from 'react'
import SidebarLeft from '../components/SidebarLeft'
import SidebarLeftHam from '../components/SidebarLeftHam'
import SidebarRight from '../components/SidebarRight'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../redux/features/postSlice'
import Posts from '../components/Posts'
import { Helmet } from "react-helmet";
function MainPage() {
    const dispatch = useDispatch()
    const [sorted, setSorted] = useState(true)
    const [menu, setMenu] = useState(false)

    let { posts, popularPosts } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className='flex flex-col md:flex-row gap-0 md:gap-5 calc__height dark:bg-gray-600'>
            {
                menu && (
                    <div className='fadeIn absolute w-full h-screen top-0 left-0 z-40'>
                        <SidebarLeftHam />
                    </div>
                )
            }
            <Helmet>
                <meta charSet="utf-8" />
                <title>connect.com  </title>
            </Helmet>
            <div onClick={menu ? () => setMenu(false) : () => setMenu(true)} className="flex justify-center sm:hidden fixed right-5 cursor-pointer bottom-5 z-50 w-[60px] h-[60px] bg-gray-900 rounded-full">
                <div className='flex items-center justify-center'>
                    {
                        !menu
                            ?
                            (
                                <div onClick={() => setMenu(true)} className='space-y-2'>
                                    <span className="block w-8 h-0.5 bg-gray-100"></span>
                                    <span className="block w-8 h-0.5 bg-gray-100"></span>
                                    <span className="block w-5 h-0.5 bg-gray-100"></span>
                                </div>
                            )
                            :
                            (
                                <div onClick={() => setMenu(false)} className='space-y-2'>
                                    <span className="block w-8 h-0.5 bg-gray-100"></span>
                                    <span className="block w-5 h-0.5 bg-gray-100"></span>
                                </div>
                            )
                    }
                </div >
            </div>
            <div className='md:w-[200px] xl:w-[300px]'>
                <SidebarLeft />
            </div>
            <div className="flex-1 h-full">
                <div className="fixed top-24 ml-4 sm:ml-10 flex gap-10 items-center">
                    <button onClick={() => setSorted(false)} data-id="1" type="button" className={sorted ? "text-white bg-slate-300 hover:bg-cyan-800 focus:outline-none focus: font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white/60 dark:text-black dark:hover:bg-white/80" : "text-white bg-cyan-600 hover:bg-cyan-800 focus:outline-none focus font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white text-black"}>
                        <svg className='dark:fill-black' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" />
                            <path d="M16 9V16H23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[18px] font-normal text-white dark:text-black'>New</span>
                    </button>
                    <button onClick={() => setSorted(true)} data-id="2" type="button" className={sorted ? "text-white bg-cyan-600 hover:bg-cyan-800 focus:outline-none focus: font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white text-black" : "text-white bg-slate-300 hover:bg-cyan-800 focus:outline-none focus: font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center justify-center mx-auto gap-3 dark:bg-white/60 text-black dark:hover:bg-white/80"}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='dark:stroke-black' d="M8 24L24 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path className='dark:stroke-black' d="M11 8H24V21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[18px] font-normal text-white dark:text-black'>Trending</span>
                    </button>
                </div>
                <div className='mt-20 h-full px-2 pb-32 overflow-y-scroll'>
                    {
                        !sorted
                            ?
                            posts && posts.map(post => (
                                <Posts item={post} />
                            ))
                            :
                            posts && posts.slice().sort((a, b) => b.views - a.views).map(post => (
                                <Posts item={post} />
                            ))
                    }
                </div>
            </div>
            <div className="hidden lg:block w-[200px] xl:w-[300px]">
                <SidebarRight popularPosts={popularPosts} />
            </div>
        </div >
    )
}
// bg-cyan-600
export default MainPage