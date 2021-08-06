import React, { useState, useEffect } from 'react';
import { auth, me } from '../../store' 
import { useSelector, useDispatch } from 'react-redux'
import '../../../public/styles/auth-form.css'
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
    <div onKeyDown={handleKeyDown}>
      <div>
        <label htmlFor="email">
          <small>Email: </small>
        </label>
        <input placeholder="Email" name="email" type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">
          <small>Password: </small>
        </label>
        <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button className="button" style={{'verticalAlign': "middle"}} onClick={handleSubmit}><span>Login</span></button>
      </div>
      {user.error && <strong>{user.error}</strong>}
      <p>Don't have an account?<span /> <button onClick={() => history.push('/sign-up')}>Register</button></p>
    </div>
  )
}
