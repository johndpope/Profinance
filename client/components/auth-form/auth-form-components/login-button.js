import React from 'react'

export default function LoginButton({ handleSubmit }) {
  return (
    <div className='login-button' onClick={handleSubmit}>
      Login
    </div>
  )
}
