import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { sendResetEmail } from '../redux/features/resetSlice'

function ResetPasswordPage() {
    const mailvalid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status } = useSelector(state => state.reset)

    useEffect(() => {
        if (status) {
            toast.info(status)
        }
    }, [status])

    const handleResetMail = () => {
        if (username.trim() === '') {
            toast.warning('Please write your username!')
            return
        }
        if (email.trim() === '') {
            toast.warning('Please write your email!')
            return
        }
        if (email.replace(mailvalid, '') !== '') {
            toast.warning('Your email is not correct!')
            return
        }
        try {
            dispatch(sendResetEmail({ username, email }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex px-2 back items-center dark:bg-gray-600'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Password</title>
            </Helmet>
            <div className=" container mx-auto">
                <div className='w-96 py-16 backdrop-blur-lg border-2 rounded-2xl mx-auto'>
                    <div className='w-80 mx-auto'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white'>Your Email</h1>
                        <form className='w-full sm:min-w-[330px]' onSubmit={e => e.preventDefault()}>
                            <div className='mt-5'>
                                <label htmlFor="username" className="block mb-2 text-[16px] font-bold text-white/90">Username <span className='text-red-600'>*</span></label>
                                <div>
                                    <input value={username} onChange={e => setUsername(e.target.value)} id="username" maxLength={20} className="w-full rounded rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="mail" className="block mb-2 text-[16px] font-bold text-white/90">Your email <span className='text-red-600'>*</span></label>
                                <div>
                                    <input value={email} onChange={e => setEmail(e.target.value)} type='email' id="mail" className="w-full rounded bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 text-[16px] border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your email" />
                                </div>
                            </div>
                            <button onClick={handleResetMail} className="md:whitespace-nowrap mt-8 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Reset Link</button>
                        </form>
                        <div className='flex items-center justify-center gap-5 mt-10 md:mt-30'>
                            <p className='text-white font-semibold'>Already have an account?</p>
                            <Link to="/login">
                                <button className="whitespace-nowrap text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ResetPasswordPage