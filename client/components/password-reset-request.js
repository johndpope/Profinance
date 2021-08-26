import React, { useState } from 'react'
import axios from 'axios'

export default function PasswordResetRequest() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    await axios.post('/api/request-reset', {email})
    .catch(err => console.log(err))
    .then(window.location.href = '/login')
  }

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => handleSubmit(email)}>Reset Password</button>
    </div>
  )
}
