import React, { useState } from 'react'

export default function PasswordResetForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    await fetch('/api/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    }).then(window.location.href = '/login')
  }

  return (
    <div>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => handleSubmit(email)}>Reset</button>
    </div>
  )
}
