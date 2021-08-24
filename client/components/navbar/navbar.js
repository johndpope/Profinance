import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store'
import Logout from './logout'
import Settings from './settings'

export default function Navbar({ user }) {
  const dispatch = useDispatch()
  return (
    <nav>
      {user._id && user.googleId && (
        <nav>
          <div>
            <h1><a href="/">Profinance</a></h1>
            <Logout dispatch={dispatch} logout={logout} />
            <hr />
          </div>
        </nav>
      )}
      {user._id && !user.googleId && (
        <nav>
          <div>
            <h1><a href="/">Profinance</a></h1>
            <Settings />
            <Logout dispatch={dispatch} logout={logout} />
            <hr />
          </div>
        </nav>
      )}
    </nav>
  )
}
