import React, { useState, useEffect } from 'react';
import { auth, me } from '../../store' 
import { useSelector, useDispatch } from 'react-redux'
import '../../../public/styles/auth-form.css'
import history from '../../history'
import Email from './auth-form-components/email'
import Password from './auth-form-components/password'
import SignupButton from './auth-form-components/signup-button'
import ConfirmPassword from './auth-form-components/confirm-password'
import logo from '../../../public/assets/logo.png'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      dispatch(auth(email, password, 'signup'))
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSubmit(e)
    }
  }
  return (
    <div className='auth-form' onKeyDown={handleKeyDown}>
      <img src={logo} alt='logo' />
      <h1>Welcome to Profinance</h1>
      {user.error && <strong className='error'>{user.error}</strong>}
      <Email setEmail={setEmail} />
      <Password setPassword={setPassword} />
      <ConfirmPassword setConfirmPassword={setConfirmPassword} />
      <SignupButton handleSubmit={handleSubmit} />
      or
      <button onClick={() => window.location.href = '/auth/google'}>
        Sign up with google
      </button>
      <p>Have an account?<span /> <a href='/login'>Login</a></p>
    </div>
    
  )
}
