import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'
import RequiredLogout from '../../../modules/required_logout'

function StrictRoute({ component: Component, authenticated, ...rest }) {
  const renderComponent = ({ ...props }) => {
    if (authenticated) return <RequiredLogout {...props} />
    return <Component {...props} />
  }
  return (
    <Route {...rest} render={renderComponent} />
  )
}

StrictRoute.propTypes = {
  authenticated: PropTypes.bool
}

StrictRoute.defaultProps = {
  authenticated: false
}

export default StrictRoute
