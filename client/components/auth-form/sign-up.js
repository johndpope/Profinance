import React, { useState, useEffect } from 'react';
import { auth, me } from '../../store' 
import { useSelector, useDispatch } from 'react-redux'
import '../../../public/styles/auth-form.css'
import history from '../../history'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // const [password1, setPassword1] = useState('')
  // const [password2, setPassword2] = useState('')

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(password1 === password2) {
    //   setPassword(password1)
    // } else {
    //   console.log(user.error)
    //   console.log('Passwords do not match')
    // }
    dispatch(auth(email, password, 'signup'))
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
      {/* <div>
        <label htmlFor="password">
          <small>Re-enter Password: </small>
        </label>
        <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword2(e.target.value)} />
      </div> */}
      <div>
        <button className="button" style={{'verticalAlign': "middle"}} onClick={handleSubmit}><span>Signup</span></button>
      </div>
      {user.error && <strong>{user.error}</strong>}
      <p>Have an account?<span /> <button onClick={() => history.push('/login')}>Login</button></p>
    </div>
  )
}