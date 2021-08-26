import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { PlaidLogin, UserHome, SignUp, Login, PasswordResetRequest, Settings, PasswordReset } from './components'

export default function Routes({ user }) {

  return (
    <Switch>
      {user._id && user.accessToken && (
        <Switch>
          <Route exact path="/login" render={() => (
            <Redirect to="/home"/>
          )}/>
          <Route exact path="/home" component={UserHome} />
          <Route path="/settings" component={Settings} />
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
        <Route exact path="/reset" component={PasswordResetRequest} />
        <Route exact path="/reset-password/:id/:token" component={PasswordReset} />
        {/* <Redirect from="/*" to="/" /> */}
    </Switch>
  )
}
