import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../public/styles/password-reset.css'

export default function PasswordReset() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const { id, token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!password) {
      alert('Please enter a password')
    } else if(password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      await axios.post(`/api/users/reset-password/${id}/${token}`, {password})
      .then(window.location.href = '/')
    }
  }

  return (
    <div className="password-reset-container">
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setconfirmPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
