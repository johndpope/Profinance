import React, { useState } from 'react'
import axios from 'axios'
import '../../public/styles/password-reset-request.css'

export default function PasswordResetRequest() {
  const [email, setEmail] = useState('')

  const isEmailValid = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e) => {
    if(email && isEmailValid(email)) {
      await axios.post('/api/request-reset', {email})
      .catch(err => console.log(err))
      .then(alert('Password reset email sent!'))
      .then(window.location.href = '/login')
    }
  }

  return (
    <div className="password-reset-request-container">
      <h2>Forgot Password?</h2>
      <p>Enter email to reset your password.</p>
      <input autoComplete="on" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => handleSubmit(email)}>Reset Password</button>
    </div>
  )
}
