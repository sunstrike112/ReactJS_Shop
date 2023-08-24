import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
// import PropTypes from 'prop-types';
import MDHContainer from 'dhm/containers';
import { LoadingCommon } from 'dhm/components/Loading';
import { UserRole } from 'dhm/services/permission/roleUser';
import { routes } from './config';

const {
  Layouts: { LayoutApp },
} = MDHContainer;

const authorizedRoutes = {
  all: [
    routes[0],
    routes[1],
    routes[2],
    routes[3],
    routes[4],
    routes[5],
    routes[6],
    routes[7],
    routes[8],
    routes[9],
    routes[10],
  ],
};

const unauthorizedRoutes = [routes[1]];
// eslint-disable-next-line no-unused-vars
function AppRoutes({ userRole }) {
  const authorizedRoutesForUserRole = authorizedRoutes.all || [];
  const authorizedRouteConfigs = authorizedRoutesForUserRole.map((route) => {
    const children = route.children || [];
    return {
      path: route.path,
      element: route.element,
      children: children.map((childRoute) => ({
        path: childRoute.path,
        element: childRoute.element,
      })),
    };
  });

  const routingConfig = useRoutes([
    ...unauthorizedRoutes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
    ...authorizedRouteConfigs,
    { path: '*', element: <div>Not Found Page</div> },
  ]);

  return (
    <LayoutApp>
      <Suspense fallback={<LoadingCommon isContent />}>{routingConfig}</Suspense>
    </LayoutApp>
  );
}

AppRoutes.propTypes = {
  // userRole: PropTypes.oneOf(Object.values(UserRole)),
};

AppRoutes.defaultProps = {
  userRole: UserRole.VIEWER,
};

export default AppRoutes;
