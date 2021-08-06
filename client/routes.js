import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PlaidLogin, UserHome, SignUp, Login } from './components'

export default function Routes({ user }) {
  return (
    <Switch>
      {user._id && user.accessToken && (
        <Switch>
          <Route exact path="/" component={UserHome} />
        </Switch>
      )}
      {user._id && !user.accessToken && (
        <Switch>
          <Route component={PlaidLogin} />
        </Switch>
      )}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>

    </Switch>
  )
}
