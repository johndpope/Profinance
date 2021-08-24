import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Settings() {
  const user = useSelector(state => state.user)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password) alert('Please enter a password')
    if(password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      axios.post(`/api/users/${user._id}`, {password})
      .then(alert('Password updated'))
      .catch(err => console.log(err))
      .then(window.location.href = '/')
    }
  }

  return (
    <div className="settings">
      <h1>Change Password</h1>
      <input type="text" placeholder={user.email} disabled={true} />
      <input type="password" placeholder='new password' onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
      <button onClick={handleSubmit}>Change Password</button>
    </div>
  )
}
