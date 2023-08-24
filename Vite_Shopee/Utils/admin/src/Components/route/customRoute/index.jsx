/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  Route
} from 'react-router-dom'

function CustomRoute({
  component: Component, layout: Layout, ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (<Component {...props} />)}
    />
  )
}

export default CustomRoute
