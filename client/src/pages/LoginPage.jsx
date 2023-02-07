import React, { useEffect, useRef, useState } from 'react'
import tempo from '../images/temporary.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { checkIsAuth, loginUser } from '../redux/features/authSlice'
function LoginPage() {
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let valid = useRef()
    let valid2 = useRef()
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    function handleLogin() {
        if (username.trim() === '') {
            valid.current.focus()
            toast('Please write your username!')
            return
        }
        if (password.trim() === '') {
            valid2.current.focus()
            toast('Please write your password!')
            return
        }
        try {
            dispatch(loginUser({ username, password }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex items-center'>
            <div className="container mx-auto px-5">
                <div className='w-full flex justify-center gap-0 items-center md:gap-10 xl:gap-20'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl mb-4 md:text-5xl font-bold mb-16'>Sign In</h1>
                        <form className='w-full sm:min-w-[330px]' onSubmit={(e) => e.preventDefault()}>
                            <div className='mt-5'>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username <span className='text-red-600'>*</span></label>
                                <div>
                                    <input ref={valid} value={username} onChange={e => setUsername(e.target.value)} id="username" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className='text-red-600'>*</span></label>
                                <div>
                                    <input ref={valid2} value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                                </div>
                            </div>
                            <Link to="/"><p className='text-blue-400 flex justify-end mt-5 underline hover:text-blue-600'>Forgotten Password</p></Link>
                            <button onClick={handleLogin} className="md:whitespace-nowrap mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Sign In</button>
                        </form>
                        <div className='flex items-center gap-5 mt-20 md:mt-40'>
                            <p className='text-black font-semibold'>Don’t have account yet?</p>
                            <Link to="/register">
                                <button className="whitespace-nowrap text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Account</button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img className='hidden md:block' src={tempo} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage