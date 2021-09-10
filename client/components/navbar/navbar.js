import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store'
import Logout from './logout'
import Settings from './settings'
import Home from './home'
import logo from '../../../public/assets/logo.png'
import '../../../public/styles/navbar.css'

export default function Navbar({ user }) {
  const dispatch = useDispatch()
  return (
    <nav>
      {user._id && user.googleId && (
        <div className="navbar-container">
          <img src={logo} alt="logo" onClick={() => window.location.href = '/'} />
          <div className="button-container">
            <Home />
            <Logout dispatch={dispatch} logout={logout} />
          </div>
        </div>
      )}
      {user._id && !user.googleId && (
        <div className="navbar-container">
          <img src={logo} alt="logo" onClick={() => window.location.href = '/'}/>
          <div className="button-container">
            <Home />
            <Settings />
            <Logout dispatch={dispatch} logout={logout} />
          </div>
        </div>
      )}
    </nav>
  )
}
