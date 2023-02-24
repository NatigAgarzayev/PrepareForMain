import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Logo from '../images/logo-auth.svg'
import { checkIsAuth } from '../redux/features/authSlice'
import { followUser, getUserFollowers, getUserFollowing, unfollowUser } from '../redux/features/followersSlice'
import { getUserLatestPost } from '../redux/features/postSlice'
import { changeUserAvatar, getUserAvatar, getUserById, resetUserAvatar } from '../redux/features/profileSlice'
import PulseLoader from 'react-spinners/PulseLoader'
function ProfilePage() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [avatar, setAvatar] = useState(false)
    const [view, setView] = useState(false)
    const [image, setImage] = useState('')
    const { user } = useSelector(state => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const { isLoading } = useSelector(state => state.profile)
    const userInfo = useSelector(state => state.profile.user)
    const { followers } = useSelector(state => state.followers)
    const { status } = useSelector(state => state.followers)
    const { id } = useParams()
    const dispatch = useDispatch()
    const { latestPost } = useSelector(state => state.post)
    const userAvatar = useSelector(state => state.profile.avatar)
    useEffect(() => {
        if (status) {
            toast.info(status)
        }
    }, [status])

    useEffect(() => {
        dispatch(getUserAvatar(id))
        dispatch(getUserFollowers(id))
        dispatch(getUserFollowing(id))
    }, [id, dispatch])

    const fetchUser = useCallback(async () => {
        try {
            await dispatch(getUserById(id))
            dispatch(getUserLatestPost(id))
        } catch (error) {
            console.log(error)
        }
    }, [id, dispatch])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const handleFollow = async () => {
        await dispatch(followUser(id))
        dispatch(getUserFollowers(id))
        toast.success('You are following this user now!')
    }

    const handleUnfollow = async () => {
        await dispatch(unfollowUser(id))
        dispatch(getUserFollowers(id))
        toast.success('You unfollow this user!')
    }
    const handleFollowUser = async (id) => {
        await dispatch(followUser(id))
        dispatch(getUserFollowers(id))
        toast.success('You are following this user now!')
    }

    const handleUnfollowUser = async (id) => {
        await dispatch(unfollowUser(id))
        dispatch(getUserFollowers(id))
        toast.success('You unfollow this user!')
    }

    const handleModal = () => {
        setModal(true)
        dispatch(getUserFollowers(id))
    }

    const handleModal2 = () => {
        setModal2(true)
        dispatch(getUserFollowing(id))
    }

    const handleAvatar = async () => {
        try {
            setAvatar(false)
            const data = new FormData()
            data.append('image', image)
            await dispatch(changeUserAvatar(data))
            dispatch(getUserAvatar(id))
            setImage('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = async () => {
        await dispatch(resetUserAvatar(id))
        dispatch(getUserAvatar(id))
    }

    return (
        <>
            {
                avatar && (
                    <div className='absolute z-30 w-full h-screen bg-black/20 flex items-center justify-center'>
                        <div id="popup-modal" tabIndex="-1" className="absolute flex items-center justify-center">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setAvatar(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                                <div className="p-6 text-center">
                                    <div className='flex justify-center mb-5'>
                                        {
                                            image ? (
                                                <img className='border w-[140px] h-[140px] object-cover rounded-full bg-white' src={URL.createObjectURL(image)} alt="Logo" />
                                            )
                                                :
                                                (<img className='border w-[140px] h-[140px] object-cover rounded-full bg-white' src={`http://localhost:4444/${userAvatar}`} alt="Logo" />)
                                        }
                                    </div>
                                    <form>
                                        <label htmlFor="avatar-file">
                                            <input onChange={e => setImage(e.target.files[0])} type="file" id='avatar-file' className="" accept='.jpeg, .png,.jpg' />
                                        </label>
                                        <h3 className="my-5 text-lg font-normal text-gray-500 dark:text-gray-400">Choose your avatar.</h3>
                                        <button disabled={image === '' ? true : false} typeof='button' onClick={handleAvatar} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 disabled:bg-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Change
                                        </button>
                                        <button onClick={handleReset} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                modal && (
                    <>
                        <div onClick={() => setModal(false)} className='w-full h-screen cursor-pointer absolute left-0 z-50 overflow-hidden bg-black/20'>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[350px] mx-auto">
                            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">Followers</h3>
                                </div>
                                <div className="flow-root">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            followers.length > 0 ? followers.map((follower, index) => (
                                                <li key={index} className="py-3 sm:py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <img className="w-8 h-8 rounded-full" src={Logo} alt="Neil" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 hover: cursor-pointer">
                                                            <p onClick={() => { navigate(`/profile/${follower.user}`); setModal(false) }} className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                {follower.username}
                                                            </p>
                                                        </div>
                                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                            {
                                                                user?._id !== follower.user ? (
                                                                    <button disabled={isAuth ? false : true} onClick={() => { navigate(`/profile/${follower.user}`); setModal(false) }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm: ease-linear transition-all duration-150" type="button">
                                                                        Visit
                                                                    </button>
                                                                )
                                                                    :
                                                                    (<button disabled={isAuth ? false : true} onClick={() => { navigate(`/profile/${follower.user}`); setModal(false) }} className="border border-pink-500 text-pink-600 active:bg-pink-600 uppercase font-semibold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                                        You
                                                                    </button>)
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                                :
                                                <div className='text-center text-sm text-slate-400'>User doesn't have followers!</div>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                modal2 && (
                    <>
                        <div onClick={() => setModal2(false)} className='w-full h-screen cursor-pointer absolute left-0 z-50 overflow-hidden bg-black/20'>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[350px] mx-auto">
                            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">Following</h3>
                                </div>
                                <div className="flow-root">
                                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            userInfo?.following.length > 0 ? userInfo?.following.map((following, index) => (
                                                <li key={index} className="py-3 sm:py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <img className="w-8 h-8 rounded-full" src={Logo} alt="Neil" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 hover: cursor-pointer">
                                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                {following.username}
                                                            </p>
                                                        </div>
                                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                            {
                                                                user?._id !== following.user ? (
                                                                    <button disabled={isAuth ? false : true} onClick={() => { navigate(`/profile/${following.user}`); setModal2(false) }} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm: ease-linear transition-all duration-150" type="button">
                                                                        Visit
                                                                    </button>
                                                                )
                                                                    :
                                                                    (<button disabled={isAuth ? false : true} onClick={() => { navigate(`/profile/${following.user}`); setModal2(false) }} className="border border-pink-500 text-pink-600 active:bg-pink-600 uppercase font-semibold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                                        You
                                                                    </button>)
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                                :
                                                <div className='text-center text-sm text-slate-400'>User doesn't follow anybody!</div>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                view && (
                    <div onClick={() => setView(false)} className='w-full h-screen cursor-pointer absolute left-0 z-50 overflow-hidden bg-black/20'>
                        <img className='border absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[740px] h-[740px] object-cover rounded-full bg-white' src={`http://localhost:4444/${userAvatar}`} alt="User avatar" />
                    </div>
                )
            }
            {
                !isLoading ? (
                    <>
                        <section className="  relative block h-[50vh] bg-slate-200 dark:bg-slate-600">
                            <div className="back absolute top-0 w-full h-full -skew-y-1 -translate-y-10">
                                <span id="blackOverlay" className="z-10 w-full h-full absolute opacity-50 bg-black"></span>
                            </div>
                        </section >
                        <section className=" relative z-20 pt-16 h-[50vh] bg-slate-200 dark:bg-slate-600">
                            <div className="container mx-auto px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 dark:bg-slate-700">
                                    <button onClick={() => navigate(-1)} type="button" className="absolute mt-5 ml-5 mb-5 text-slate-500 border border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800">
                                        <svg aria-hidden="true" className="rotate-180 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <div className="px-6">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                <div className='absolute -top-16'>
                                                    {/* HERE */}
                                                    <div className='relative overflow-hidden rounded-full'>
                                                        <img className='border w-[140px] h-[140px] object-cover rounded-full bg-white' src={`http://localhost:4444/${userAvatar}`} alt="User avatar" />
                                                        {
                                                            user?._id === id ?
                                                                (
                                                                    <div onClick={() => setAvatar(true)} className='edit__user w-full h-[140px] left-0 top-0 bg-red z-30 absolute flex items-center cursor-pointer rounded-full justify-center'>
                                                                        <svg className=' fill-white/70 w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" /></svg>
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div onClick={() => setView(true)} className='edit__user w-full h-[140px] left-0 top-0 bg-red z-30 absolute flex items-center cursor-pointer rounded-full justify-center'>
                                                                    </div>
                                                                )
                                                        }
                                                    </div >
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                                <div className="py-6 px-3 mt-32 sm:mt-0">
                                                    {
                                                        user?._id !== id ? (followers.filter(x => x.user === user?._id).length !== 1 ? (
                                                            <button disabled={isAuth ? false : true} onClick={handleFollow} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                                Follow
                                                            </button>
                                                        ) :
                                                            (<button disabled={isAuth ? false : true} onClick={handleUnfollow} className="border border-pink-500 text-pink-600 active:bg-pink-600 uppercase font-semibold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                                Unfollow
                                                            </button>)
                                                        )
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                    <div onClick={handleModal} className="cursor-pointer mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-white">{followers?.length}</span><span className="text-sm text-blueGray-400 dark:text-white">Followers</span>
                                                    </div>
                                                    <div onClick={handleModal2} className="cursor-pointer mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-white">{userInfo?.following.length}</span><span className="text-sm text-blueGray-400 dark:text-white">Followings</span>
                                                    </div>
                                                    <div className="mr-4 p-3 text-center">
                                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600 dark:text-white">{userInfo?.posts.length}</span><span className="text-sm text-blueGray-400 dark:text-white">Posts</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center mt-8 pb-10">
                                            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2 dark:text-white">
                                                {userInfo?.username}
                                            </h3>
                                            <div onClick={() => { navigator.clipboard.writeText(`${userInfo?.email}`); toast.success('Copied!') }} className="text-sm cursor-pointer leading-normal mt-5 mb-2 text-blueGray-400 font-bold uppercase dark:text-white/90">
                                                <p className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase dark:text-white/90'>{userInfo?.email}</p>
                                                <sub>Click to copy</sub>
                                            </div>
                                            <div className="text-2xl text-start ml-20 py-10 leading-normal mt-0 mb-2 font-bold capitalize dark:text-white">
                                                Last update
                                                {
                                                    latestPost?._id ? (<div className="max-w-sm mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                        <div>
                                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{latestPost.title}</h5>
                                                        </div>
                                                        <p className="mb-3 h-5 text-[14px] font-normal overflow-hidden text-ellipsis text-gray-700 dark:text-gray-400">{latestPost.text}</p>
                                                        <div onClick={() => navigate(`/${latestPost._id}`)} className="inline-flex items-center px-3 py-2 cursor-pointer text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            Read more
                                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                        </div>
                                                    </div>)
                                                        :
                                                        user?._id === id ?
                                                            (<div div className='flex gap-4 items-center'>
                                                                <div className='text-lg text-slate-600 dark:text-white'>Let's create youe first post</div>
                                                                <button onClick={() => navigate('/new')} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                                                            </div>)
                                                            :
                                                            (<div className='flex gap-4 items-center'>
                                                                <div className='text-lg text-slate-600 normal-case dark:text-white/90'><span className='font-bold text-black capitalize dark:text-white'>{userInfo?.username || 'This user'}</span> doesn't have any posts!</div>
                                                            </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
                    :
                    (
                        <div className='w-full h-screen bg-white/90 flex items-center justify-center dark:bg-black/90'>
                            <PulseLoader
                                color={window.localStorage.getItem('theme') === 'light' ? '#000' : '#fff'}
                                speedMultiplier={0.5}
                            />
                        </div>
                    )
            }
        </>
    )
}

export default ProfilePage