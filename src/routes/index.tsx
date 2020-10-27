import React, { Fragment, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Admin from '../pages/admin'
import Login from '../pages/login'
import Users from '../pages/users'
import Portal from '../pages/portal'
import axios from '../utils/axios'

export default () => {
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(true)

  useEffect(() => {
    axios
      .post('/auth', { id: localStorage.getItem('id') })
      .then(res => res.data)
      .then(data => {
        setAuth(data.auth)
      })

    setLoading(false)
  }, [loading])

  return (
    <Switch>
      <Route exact path='/login' render={() => <Login />} />
      {auth ? (
        <Fragment>
          <Route exact path='/-/portal' render={() => <Portal />} />
          <Route exact path='/-/admins' render={() => <Admin />} />
          <Route exact path='/-/users' render={() => <Users />} />
        </Fragment>
      ) : <Redirect to="/login" />}
    </Switch>
  )
}
