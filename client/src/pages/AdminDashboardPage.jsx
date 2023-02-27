import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changeUserRole, changeUserStatus, deleteUsers, getDashStats } from '../redux/features/adminSlice'

function AdminDashboardPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { stats } = useSelector(state => state.admin)
    const { status } = useSelector(state => state.admin)
    const selectValue = useRef()

    useEffect(() => {
        if (status === 'You are logged in as ADMIN!') {
            return
        }
        if (status) {
            toast(status)
        }
    }, [status])

    const [isDelete, setIsDelete] = useState({ isOpen: false, deletedUser: '' })
    const [changeRole, setChangeRole] = useState({ isOpen: false, prevRole: '', userRole: '' })
    const [changeStatus, setChangeStatus] = useState({ isOpen: false, userStatus: '' })
    const [searchResult, setSearchResult] = useState('')
    const [statusUserId, setStatusUserId] = useState('')
    const [sortedName, setSortedName] = useState(false)
    const [sortedFollowers, setSortedFollowers] = useState(false)
    const [sortWay, setSortWay] = useState(true)
    const [userDetail, setUserDetail] = useState({ isOpen: false, userInfo: '' })

    useEffect(() => {
        dispatch(getDashStats())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteUsers(id))
        setIsDelete({ isOpen: false })
    }

    const handleRole = (id) => {
        const role = selectValue.current.value
        console.log(role)
        dispatch(changeUserRole({ id, role }))
        setChangeRole({ isOpen: false })
    }

    const handleStatus = (id) => {
        const status = changeStatus.userStatus
        dispatch(changeUserStatus({ id, status }))
        setChangeStatus({ isOpen: false })
    }

    const handleViewUser = (id) => {
        const userView = stats.user.filter(x => x._id === id)
        setUserDetail({ isOpen: true, userInfo: userView })
    }

    return (
        <>
            {
                userDetail.isOpen && (
                    <>
                        <div onClick={() => setUserDetail({ isOpen: false })} className="fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                        <div className="fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-[400px] h-full max-w-md md:h-auto">
                                <div className="relative pt-10 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <p className='text-center mb-2 text-gray-700 text-lg dark:text-white'>{userDetail.userInfo[0]?.role}</p>
                                    <div className='w-48 h-48 mx-auto rounded-full overflow-hidden'>
                                        <img className="object-cover w-48 h-48" src={`http://localhost:4444/${userDetail.userInfo[0]?.avatar}`} alt="Your avatar" />
                                    </div>

                                    <p className='text-center w-56 mx-auto mt-5 text-gray-600 text-xs dark:text-white'>Username</p>
                                    <p className='text-center text-gray-900 text-2xl dark:text-white'>{userDetail.userInfo[0]?.username}</p>
                                    <p className='text-center w-56 mx-auto mt-5 text-gray-600 text-sm dark:text-white'>Email</p>
                                    <p className='text-center text-gray-700 text-lg dark:text-white'>{userDetail.userInfo[0]?.email}</p>
                                    <p className='text-center w-56 mx-auto mt-5 text-gray-600 text-sm dark:text-white'>Status</p>
                                    <p className='text-center w-56 mx-auto max-h-[100px] text-gray-600 text-lg dark:text-white'>{userDetail.userInfo[0]?.status}</p>
                                    <div className="p-6 pt-16 text-center">
                                        <button onClick={() => navigate(`/profile/${userDetail.userInfo[0]?._id}`)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Visit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                changeStatus.isOpen && (
                    <>
                        <div div className="fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                        <div className="fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-[400px] h-full max-w-md md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={() => setChangeStatus({ isOpen: false })} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <div className="p-6 text-center">
                                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                        <textarea value={changeStatus.userStatus} onChange={e => setChangeStatus({ isOpen: true, userStatus: e.target.value })} maxLength={86} id="message" rows="4" className="block my-6 max-h-[100px] resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                        <button onClick={() => handleStatus(statusUserId)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <button onClick={() => setChangeStatus({ isOpen: false })} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                changeRole.isOpen && (
                    <>
                        <div div className=" fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                        <div className="fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-[400px] h-full max-w-md md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={() => setChangeRole({ isOpen: false })} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <div className="p-6 text-center">
                                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                        <select ref={selectValue} id="countries" className="bg-gray-50 border my-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected={changeRole.prevRole === 'ADMIN' ? true : false} value="ADMIN">ADMIN</option>
                                            <option selected={changeRole.prevRole === 'USER' ? true : false} value="USER">USER</option>
                                        </select>
                                        <button onClick={() => handleRole(changeRole.userRole)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <button onClick={() => setChangeRole({ isOpen: false })} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            {
                isDelete.isOpen && (
                    <>
                        <div div className=" fixed inset-0 z-10 w-full h-full bg-slate-100/30" ></div>

                        <div className="fadeIn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <div className="relative w-[400px] h-full max-w-md md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <button onClick={() => setIsDelete({ isOpen: false })} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this USER?</h3>
                                        <button onClick={() => handleDelete(isDelete.deletedUser)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <button onClick={() => setIsDelete({ isOpen: false })} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <div div className='flex-1 pt-10' >
                <h3 className="text-gray-700 text-3xl ml-8 font-medium">Dashboard</h3>
                <div className="mt-4">
                    <div className="flex flex-wrap">
                        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                                    <svg className="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z" fill="currentColor" />
                                        <path d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z" fill="currentColor" />
                                        <path d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z" fill="currentColor" />
                                        <path d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z" fill="currentColor" />
                                        <path d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z" fill="currentColor" />
                                        <path d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z" fill="currentColor" />
                                    </svg>
                                </div>

                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.user?.length}</h4>
                                    <div className="text-gray-500">Users</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                                    <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z" fill="currentColor" />
                                        <path d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z" fill="currentColor" />
                                        <path d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z" fill="currentColor" />
                                    </svg>
                                </div>

                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.post?.length}</h4>
                                    <div className="text-gray-500">Total Posts</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                    <svg className="h-8 w-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                        <path d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>

                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">{stats.comment?.length}</h4>
                                    <div className="text-gray-500">Available Comments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="-my-2 py-2 overflow-x-auto sm:px-6 lg:px-8">

                        <div className="relative mb-10 mx-4 lg:mx-0">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>

                            <input value={searchResult} onChange={e => setSearchResult(e.target.value)} className="w-32 py-3 border pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600" type="text" placeholder="Search by username" />
                        </div>

                        <p className='mb-4 text-gray-400'>*You can change status, role or delete user. Also sort by name and by followers.</p>

                        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="flex gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            <span>Name</span>
                                            {
                                                sortedName ?
                                                    (
                                                        <svg onClick={() => { setSortedName(false); setSortWay(true) }} className='cursor-pointer w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                                                    )
                                                    :
                                                    (
                                                        <svg onClick={() => { setSortedName(true); setSortWay(true) }} className='cursor-pointer w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                                                    )
                                            }
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="flex gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                            <span>Followers/-ings</span>
                                            {
                                                sortedFollowers ?
                                                    (
                                                        <svg onClick={() => { setSortedFollowers(false); setSortWay(false) }} className='cursor-pointer w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" /></svg>
                                                    )
                                                    :
                                                    (
                                                        <svg onClick={() => { setSortedFollowers(true); setSortWay(false) }} className='cursor-pointer w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                                                    )
                                            }
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white relative">
                                    {
                                        stats.user && stats.user
                                            .filter(item => item?.username.toLowerCase().includes(searchResult.toLowerCase()))
                                            .sort((a, b) => (sortWay ? (sortedName ? b.username.localeCompare(a.username) : a.username.localeCompare(b.username)) : sortedFollowers ? (a?.followers.length - b?.followers.length) : (b?.followers.length - a?.followers.length)))
                                            .map(item => (
                                                <tr className='fadeIn' key={item._id}>
                                                    <td onClick={() => handleViewUser(item?._id)} className="px-6 py-4 cursor-pointer whitespace-no-wrap border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 object-cover rounded-full" src={`http://localhost:4444/${item?.avatar}`} alt="" />
                                                            </div>

                                                            <div className="ml-4">
                                                                <div className="text-sm leading-5 font-medium text-gray-900">{item?.username}</div>
                                                                <div className="text-sm leading-5 text-gray-500">{item?.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 cursor-pointer py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <div onClick={() => { setChangeStatus({ isOpen: true, userStatus: item?.status }); setStatusUserId(item?._id) }} className="text-sm w-[100px] p-2 text-ellipsis overflow-hidden whitespace-nowrap leading-5 text-gray-500 hover:bg-emerald-100 rounded-lg">{item?.status}</div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                        <span className="px-2 inline-flex text-[16px] leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item?.followers.length} / {item?.following.length}</span>
                                                    </td>

                                                    <td onClick={() => setChangeRole({ isOpen: true, prevRole: item?.role, userRole: item?._id })} className="px-6 py-4 cursor-pointer whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                                        <div className='p-2 max-w-fit hover:bg-emerald-100 rounded-lg'>{item?.role}</div>
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-no-wrap text-left border-b border-gray-200 text-sm leading-5 font-medium">
                                                        {/* <button className="text-indigo-600 hover:text-indigo-900">Edit</button> */}
                                                        <button onClick={() => setIsDelete({ isOpen: true, deletedUser: item?._id })} disabled={item?.role === 'ADMIN' ? true : false} className="text-red-600 hover:text-red-900 disabled:text-red-400">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboardPage