import React, { useEffect, useState } from 'react'
import tempo from '../images/temporary.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, registerUser } from '../redux/features/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCon, setPasswordCon] = useState('')
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const { status } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleRegistration = () => {
        if (username.trim() === '') {
            toast('Please write your username!')
            return
        }
        if (password.trim() === '') {
            toast('Please write your password!')
            return
        }
        if (passwordCon.trim() === '') {
            toast('Please confirm the password!')
            return
        }
        if (password !== passwordCon) {
            setPassword('')
            setPasswordCon('')
            toast('Passwords are not the same!')
            return
        }
        try {
            dispatch(registerUser({ username, password }))
            setUsername('')
            setPassword('')
            setPasswordCon('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex items-center'>
            <div className="container mx-auto px-5">
                <div className='w-full flex justify-center gap-0 items-center md:gap-10 xl:gap-20'>
                    <div className='w-80'>
                        <h1 className='text-2xl sm:text-3xl mb-4 md:text-5xl font-bold mb-16'>Sign Up</h1>
                        <form className='w-full sm:min-w-[330px]' onSubmit={e => e.preventDefault()}>
                            <div className='mt-5'>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username <span className='text-red-600'>*</span></label>
                                <div>
                                    <input value={username} onChange={e => setUsername(e.target.value)} id="username" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className='text-red-600'>*</span></label>
                                <div>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password <span className='text-red-600'>*</span></label>
                                <div>
                                    <input value={passwordCon} onChange={e => setPasswordCon(e.target.value)} type="password" id="cpassword" className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" />
                                </div>
                            </div>
                            <button onClick={handleRegistration} className="md:whitespace-nowrap mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Create an Account</button>
                        </form>
                        <div className='flex items-center gap-5 mt-20 md:mt-40'>
                            <p className='text-black font-semibold'>Already have an account?</p>
                            <Link to="/login">
                                <button className="whitespace-nowrap text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
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

export default RegisterPage