import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect
} from 'react-router-dom'

import { useAuth } from 'Hooks'

function PrivateRoute({
  component: Component,
  ...rest
}) {
  const { rules, rulesWS } = rest
  const { metaData, profile } = useAuth()
  const role = metaData.roles[0]
  const roleWS = profile.isWorkSpace
  const accessible = useMemo(() => rules?.includes(role) && rulesWS.includes(roleWS), [role, roleWS])
  return (
    <Route
      {...rest}
      render={(props) => (accessible ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/403', state: {} }}
        />
      ))}
    />
  )
}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool
}

PrivateRoute.defaultProps = {
  authenticated: false
}

export default PrivateRoute
