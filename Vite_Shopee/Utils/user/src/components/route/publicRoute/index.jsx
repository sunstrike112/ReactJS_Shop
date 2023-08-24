import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PublicRoute({ component: Component, authenticated, ...rest }) {
  const renderComponent = ({ ...props }) => {
    if (authenticated) {
      return <Redirect to="/" />
    }
    return <Component {...props} />
  }

  return <Route {...rest} render={renderComponent} />
}

PublicRoute.propTypes = {
  authenticated: PropTypes.bool
}

PublicRoute.defaultProps = {
  authenticated: false
}

export default PublicRoute
