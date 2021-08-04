import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store'

export default function Navbar({ user }) {
  const dispatch = useDispatch()

  return (
    <nav>
      {user._id && (
        <div>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      )}
    </nav>
  )
}
