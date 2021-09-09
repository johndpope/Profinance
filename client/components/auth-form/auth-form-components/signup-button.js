import React from 'react'

export default function SignupButton({ handleSubmit }) {
  return (
    <button className='signup-button' onClick={handleSubmit}>
      Sign up
    </button>
    
  )
}
