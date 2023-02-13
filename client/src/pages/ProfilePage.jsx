import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Logo from '../images/logo-auth.svg'
import { getUserById } from '../redux/features/profileSlice'

function ProfilePage() {
    const navigate = useNavigate()
    const { isLoading } = useSelector(state => state.profile)
    const userInfo = useSelector(state => state.profile.user)
    const { id } = useParams()
    const dispatch = useDispatch()
    const fetchUser = useCallback(async () => {
        try {
            await dispatch(getUserById(id))
        } catch (error) {
            console.log(error)
        }
    }, [id, dispatch])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    return (
        <>
            {
                !isLoading && (
                    <>
                        <section className="relative block h-[50vh] bg-slate-200">
                            <div className="back absolute top-0 w-full h-full -skew-y-1 -translate-y-10">
                                <span id="blackOverlay" className="z-10 w-full h-full absolute opacity-50 bg-black"></span>
                            </div>
                        </section >
                        <section className="relative z-20 pt-16 h-[50vh] bg-slate-200">
                            <div className="container mx-auto px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                    <button onClick={() => navigate(-1)} type="button" className="absolute mt-5 ml-5 mb-5 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                        <svg aria-hidden="true" className="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <div className="px-6">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                <div className='absolute -top-16'>
                                                    <img className='border rounded-full bg-white' src={Logo} alt="Logo" />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                                <div className="py-6 px-3 mt-32 sm:mt-0">
                                                    <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                        Follow
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                    <div className="mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">undf</span><span className="text-sm text-blueGray-400">Followers</span>
                                                    </div>
                                                    <div className="mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userInfo?.posts.length}</span><span className="text-sm text-blueGray-400">Posts</span>
                                                    </div>
                                                    <div className="lg:mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-12 pb-10">
                                            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                                {userInfo?.username}
                                            </h3>
                                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                Los Angeles, California
                                            </div>
                                            <div className="mb-2 text-blueGray-600 mt-10">
                                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                            </div>
                                            <div className="mb-2 text-blueGray-600">
                                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}

export default ProfilePage