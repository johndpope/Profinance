import React, { useState, useEffect } from 'react';
import { auth, me } from '../../store' 
import { useSelector, useDispatch } from 'react-redux'
import '../../../public/styles/auth-form.css'
import Email from './auth-form-components/email'
import Password from './auth-form-components/password'
import LoginButton from './auth-form-components/login-button'
import PasswordReset from './auth-form-components/password-reset'
import logo from '../../../public/assets/logo.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(auth(email, password, 'login'))
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  return (
    <div className='auth-form' onKeyDown={handleKeyDown}>
      <img src={"../../../public/assets/logo.png"} alt='logo' width='100%' />
      <h1>Welcome to Profinance</h1>
      {user.error && <strong className='error'>{user.error}</strong>}
      <Email setEmail={setEmail} />
      <Password setPassword={setPassword} />
      <PasswordReset style={{textAlign: "left"}}/>
      <LoginButton handleSubmit={handleSubmit} />
      or
      <button onClick={() => window.location.href = '/auth/google'}>
        Sign in with Google
      </button>
      <p>Don't have an account?<span /> <a href='/sign-up'>Register</a></p>
    </div>
  )
}
