import React from 'react'

export default function Logout({ dispatch, logout }) {
  return (
      <button onClick={() => dispatch(logout())}>Logout</button>
  )
}
