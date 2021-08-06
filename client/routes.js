import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { PlaidLogin, UserHome, SignUp, Login } from './components'

export default function Routes({ user }) {
  return (
    <Switch>
      {user._id && user.accessToken && (
        <Switch>
          <Route exact path="/login" render={() => (
            <Redirect to="/home"/>
          )}/>
          <Route exact path="/home" component={UserHome} />
        </Switch>
      )}
      {user._id && !user.accessToken && (
        <Switch>
          <Route component={PlaidLogin} />
        </Switch>
      )}
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
    </Switch>
  )
}
