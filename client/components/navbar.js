import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store'

export default function Navbar({ user }) {
  const dispatch = useDispatch()

  return (
    <nav>
      {user._id && (
        <nav>
          <div>
            <h1><a href="/">Profinance</a> <span />
              <button onClick={() => dispatch(logout())}>Logout</button>
            </h1>
            <hr />
          </div>
        </nav>
      )}
    </nav>
  )
}
