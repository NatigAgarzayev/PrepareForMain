import React from 'react'
import SidebarLeft from '../components/SidebarLeft'
import clock from '../images/clock.svg'
import arrow from '../images/arrow.svg'
import arr_up from '../images/arr_up.svg'
import arr_down from '../images/arr_down.svg'
import view from '../images/view.svg'
import chat from '../images/chat.svg'
import logo from '../images/logo-auth.svg'
import SidebarRight from '../components/SidebarRight'
function MainPage() {
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
                    <div className="relative mb-10 shadow-lg p-[30px] flex gap-4 cursor-pointer">
                        <div className="absolute right-5 top-5">
                            <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                        </div>
                        <div className='flex justify-start'>
                            <div className="flex flex-col items-center justify-center gap-[5px]">
                                <div className='cursor-pointer'>
                                    <img src={arr_up} alt="" />
                                </div>
                                <div className="text-2xl font-semibold text-zinc-500">0</div>
                                <div className='cursor-pointer'>
                                    <img src={arr_down} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[860px] pr-8">
                            <h3 className='text-zinc-600 text-2xl font-semibold'>Which of sci-fi’s favourite technologies would you like to see become a reality?</h3>
                            <small className='mt-[5px] text-lg text-zinc-800'>09:00 pm</small>
                            <p className='text-gray-400 h-12 mt-6 mb-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue magna justo, volutpat, non amet massa viverra euismod id.</p>
                        </div>
                        <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                            <div className="flex gap-2 items-center">
                                <img src={view} alt="" />
                                <span className='text-gray-900/50 font-semibold'>0</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <img src={chat} alt="" />
                                <span className='text-gray-900/50 font-semibold'>0</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-10 shadow-lg p-[30px] flex gap-4 cursor-pointer">
                        <div className="absolute right-5 top-5">
                            <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                        </div>
                        <div className='flex justify-start'>
                            <div className="flex flex-col items-center justify-center gap-[5px]">
                                <div className='cursor-pointer'>
                                    <img src={arr_up} alt="" />
                                </div>
                                <div className="text-2xl font-semibold text-zinc-500">0</div>
                                <div className='cursor-pointer'>
                                    <img src={arr_down} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[860px] pr-8">
                            <h3 className='text-zinc-600 text-2xl font-semibold'>Which of sci-fi’s favourite technologies would you like to see become a reality?</h3>
                            <small className='mt-[5px] text-lg text-zinc-800'>09:00 pm</small>
                            <p className='text-gray-400 h-12 mt-6 mb-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue magna justo, volutpat, non amet massa viverra euismod id.</p>
                        </div>
                        <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                            <div className="flex gap-2 items-center">
                                <img src={view} alt="" />
                                <span className='text-gray-900/50 font-semibold'>0</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <img src={chat} alt="" />
                                <span className='text-gray-900/50 font-semibold'>0</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-10 shadow-lg p-[30px] flex gap-4 cursor-pointer">
                        <div className="absolute right-5 top-5">
                            <img className='w-10 h-10 rounded-full' src={logo} alt="" />
                        </div>
                        <div className='flex justify-start'>
                            <div className="flex flex-col items-center justify-center gap-[5px]">
                                <div className='cursor-pointer'>
                                    <img src={arr_up} alt="" />
                                </div>
                                <div className="text-2xl font-semibold text-zinc-500">0</div>
                                <div className='cursor-pointer'>
                                    <img src={arr_down} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-[860px] pr-8">
                            <h3 className='text-zinc-600 text-2xl font-semibold'>Which of sci-fi’s favourite technologies would you like to see become a reality?</h3>
                            <small className='mt-[5px] text-lg text-zinc-800'>09:00 pm</small>
                            <p className='text-gray-400 h-12 mt-6 mb-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue magna justo, volutpat, non amet massa viverra euismod id.</p>
                        </div>
                        <div className="absolute right-5 bottom-5 flex gap-5 items-center">
                            <div className="flex gap-2 items-center">
                                <img src={view} alt="" />
                                <span className='text-gray-900/50 font-semibold'>0</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <img src={chat} alt="" />
                                <span className='text-gray-900/50 font-semibold'>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[300px] hidden lg:block">
                <SidebarRight />
            </div>
        </div>
    )
}
// bg-cyan-600
export default MainPage