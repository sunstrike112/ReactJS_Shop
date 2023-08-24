import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'
import { ROUTES } from './constants'

export default function ProjectListRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
      ))}
    </Switch>
  )
}
