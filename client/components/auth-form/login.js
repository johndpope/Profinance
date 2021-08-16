import React, { useState, useEffect } from 'react';
import { auth, me } from '../../store' 
import { useSelector, useDispatch } from 'react-redux'
import '../../../public/styles/auth-form.css'
import Email from './auth-form-components/email'
import Password from './auth-form-components/password'
import LoginButton from './auth-form-components/login-button'
import history from '../../history'

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
    <div className='login-container' onKeyDown={handleKeyDown}>
      <h1>Welcome to Profinance</h1>
      <Email setEmail={setEmail} />
      <Password setPassword={setPassword} />
      <LoginButton handleSubmit={handleSubmit} />
      {user.error && <strong>{user.error}</strong>}
      <a href="/auth/google">
        Sign in with google
      </a>
      <p>Don't have an account?<span /> <button onClick={() => history.push('/sign-up')}>Register</button></p>
    </div>
  )
}
