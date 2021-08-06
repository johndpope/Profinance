import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store'

export default function Navbar({ user }) {
  const dispatch = useDispatch()

  return (
    <nav>
      {user._id ? (
        <nav>
          <h1>App Name <span />
            <button onClick={() => dispatch(logout())}>Logout</button>
            </h1>
            <hr />
        </nav>
      ) : (
        <nav>
        <h1>App Name</h1>
        <hr />
      </nav>
      )}
    </nav>
  )
}
