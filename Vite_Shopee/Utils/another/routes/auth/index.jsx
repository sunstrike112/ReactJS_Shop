import React, { Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import MDHContainer from 'dhm/containers';
import { LoadingCommon } from 'dhm/components/Loading';
import { ROUTES } from 'dhm/utils/constants/routes';
import { routes } from './config';

const {
  Layouts: { LayoutAuth },
} = MDHContainer;

const unauthorizedRoutes = [...routes];

function AuthRoutes() {
  const routingConfig = useRoutes([
    ...unauthorizedRoutes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
    { path: '*', element: <Navigate to={ROUTES.login} replace /> },
  ]);

  return (
    <LayoutAuth>
      <Suspense fallback={<LoadingCommon />}>{routingConfig}</Suspense>
    </LayoutAuth>
  );
}

AuthRoutes.propTypes = {};

export default AuthRoutes;
