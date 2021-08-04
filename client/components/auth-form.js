import React, { useState, useEffect } from 'react';
import { auth, me } from '../store' 
import { useSelector, useDispatch } from 'react-redux'

export default function AuthForm() {
  const [method, setMethod] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  const isEmailValid = (email) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) {
      setError(true)
    } else if(!isEmailValid(email)){
       setEmailError(true)
    } else {
      dispatch(auth(email, password, method))
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input placeholder="Email" name="email" type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSubmit}>{method}</button>
      </div>
      {error && <p>email and/or password required</p>}
      {user.error && <p>incorrect email and/or password</p>}
      {emailError && <p>email address must be valid</p>}
      {method === 'login' ? (
        <p>Don't have an account?<span /> <button onClick={() => setMethod('signup')}>Register</button></p>
      ) : (
        <p>Have an account?<span /> <button onClick={() => setMethod('login')}>Login</button></p>
      )}
    </div>
  )
}
