import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store'
import Logout from './logout'
import Settings from './settings'
import Home from './home'
import logo from '../../../public/assets/logo.png'

export default function Navbar({ user }) {
  const dispatch = useDispatch()
  return (
    <nav>
      {user._id && user.googleId && (
        <nav>
          <div>
            <img src={logo} alt="logo" />
            <Home />
            <Logout dispatch={dispatch} logout={logout} />
            <hr />
          </div>
        </nav>
      )}
      {user._id && !user.googleId && (
        <nav>
          <div>
            <h1><a href="/">Profinance</a></h1>
            <Home />
            <Settings />
            <Logout dispatch={dispatch} logout={logout} />
            <hr />
          </div>
        </nav>
      )}
    </nav>
  )
}
