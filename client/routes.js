import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthForm, PlaidLogin, UserHome } from './components'

export default function Routes({ user }) {
  return (
    <Switch>
      {user._id && user.accessToken && (
        <Switch>
          <Route exact path="/home" component={UserHome} />
        </Switch>
      )}
      {user._id && !user.accessToken && (
        <Switch>
          <Route component={PlaidLogin} />
        </Switch>
      )}
      <Switch>
        <Route exact path="/" component={AuthForm} />
      </Switch>
    </Switch>
  )
}
