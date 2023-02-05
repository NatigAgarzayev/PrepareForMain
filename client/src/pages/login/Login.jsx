import React from 'react'
import './Login.scss'
import logoAuth from '../../images/logo-auth.svg'
import loginBg from '../../images/login-bg.svg'
function Login() {
    return (
        <div className='login'>
            <div className="md:container mx-auto px-5">
                <nav className='navbar'>
                    <div className="logo">
                        <img src={logoAuth} alt="Connect" />
                        <div className="logo__content">
                            <h2>Connect</h2>
                            <small>Express yourself everyday</small>
                        </div>
                    </div>
                    <div className="nav__btn">Sign Up</div>
                </nav>
                <div className="login__content">
                    <div className="login__form">
                        <h2>Enter Credentials</h2>
                        <small>Please sign in to continue</small>
                        <form>
                            <input className='login__input' type="text" placeholder='Username' />
                            <input className='login__input' type="password" placeholder='Password' />
                            <div className="login__offer">
                                <a href="/" className="login__offer-item">Forgot Password?</a>
                                <p>Don’t have an account? <a href="/" className="login__offer-item">Sign Up</a></p>
                            </div>
                            <button className='login__btn'>Login</button>
                        </form>
                    </div>
                    <div className="login__image">
                        <img src={loginBg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login