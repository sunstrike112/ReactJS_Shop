import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

function WorkspaceRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth/login', state: {} }} />)}
    />
  )
}

WorkspaceRoute.propTypes = {
  authenticated: PropTypes.bool
}

WorkspaceRoute.defaultProps = {
  authenticated: false
}

export default WorkspaceRoute
