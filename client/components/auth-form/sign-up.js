import React, { useState, useEffect } from 'react';
import { auth, me } from '../../store' 
import { useSelector, useDispatch } from 'react-redux'
import '../../../public/styles/auth-form.css'
import history from '../../history'
import Email from './auth-form-components/email'
import Password from './auth-form-components/password'
import SignupButton from './auth-form-components/signup-button'
import ConfirmPassword from './auth-form-components/confirm-password'

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
    <div className='login-container' onKeyDown={handleKeyDown}>
      <h1>Welcome to Profinance</h1>
      <Email setEmail={setEmail} />
      <Password setPassword={setPassword} />
      <ConfirmPassword setConfirmPassword={setConfirmPassword} />
      <SignupButton handleSubmit={handleSubmit} />
      {user.error && <strong>{user.error}</strong>}
      <a href="/auth/google">
        Sign in with google
      </a>
      <p>Have an account?<span /> <button onClick={() => history.push('/login')}>Login</button></p>
    </div>
    
  )
}
