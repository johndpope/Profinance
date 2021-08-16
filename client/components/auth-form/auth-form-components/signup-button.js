import React from 'react'

export default function SignupButton({ handleSubmit }) {
  return (
    <div className='login-button' onClick={handleSubmit}>
      Sign up
    </div>
  )
}
