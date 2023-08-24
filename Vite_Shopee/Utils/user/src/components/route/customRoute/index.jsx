/* eslint-disable react/prop-types */
import React from 'react'
import {
  Route
} from 'react-router-dom'

function CustomRoute({
  component: Component, ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (<Component {...props} />)}
    />
  )
}

export default CustomRoute
