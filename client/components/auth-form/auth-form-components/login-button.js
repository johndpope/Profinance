import React from 'react'

export default function LoginButton({ handleSubmit }) {
  return (
    <button className='login-button' onClick={handleSubmit}>
      Log In
    </button>
  )
}
