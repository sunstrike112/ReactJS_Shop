/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalStore, useWorkspaces } from '../../../hooks'
import LoadingScreen from '../../../modules/loading'
import { locationLogin } from '../../../utils/location'
import { ROUTES_NAME } from '../../../constants'

function PrivateRoute({ component: Component, authenticated, path, ...rest }) {
  const { isRequiredWorkspace, isLoading: isLoadingWS } = useWorkspaces()
  const { initRoute } = useGlobalStore()

  if (isLoadingWS) {
    return <LoadingScreen />
  }

  const verify = (propsRoute) => {
    if (authenticated) {
      if (path === ROUTES_NAME.HOME) {
        return <Redirect to={initRoute.home} />
      }
      if (isRequiredWorkspace) {
        // If user not select ws yet => redirect to workspace
        return <Redirect to={{ pathname: ROUTES_NAME.WORKSPACES }} />
      }
      return <Component {...propsRoute} />
    }
    return <Redirect to={locationLogin()} />
  }

  return (
    <Route
      {...rest}
      render={verify}
    />
  )
}

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  path: PropTypes.string
}

PrivateRoute.defaultProps = {
  authenticated: false,
  path: '/'
}

export default PrivateRoute
