import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function PasswordReset() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const { id, token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!password) alert('Please enter a password')
    if(password !== confirmPassword) {
      alert('Passwords do not match')
    } else {
      await axios.post(`/api/users/change-password/${id}`, {password, token})
      .then(window.location.href = '/')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" onChange={(e) => setconfirmPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
