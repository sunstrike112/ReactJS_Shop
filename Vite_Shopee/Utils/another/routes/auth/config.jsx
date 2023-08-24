import { SignInPage } from 'dhm/pages/auth/signIn';
// import { SignUpPage } from 'dhm/pages/auth/signUp';
import { TrackingSSO } from 'dhm/pages/testSSO';
import { ROUTES } from 'dhm/utils/constants/routes';
// import { lazy } from 'react';

// const ForgetPassword = lazy(() =>
//   import('dhm/pages/auth/forgotPassword').then((module) => ({ default: module.ForgetPasswordPage })),
// );
// const ResetPassword = lazy(() => import('dhm/pages/auth/resetPassword'));

const routes = [
  { path: ROUTES.login, element: <SignInPage /> },
  // { path: ROUTES.forget_password, element: <ForgetPassword /> },
  // { path: ROUTES.reset_password, element: <ResetPassword /> },
  // { path: ROUTES.sign_up, element: <SignUpPage /> },
  { path: ROUTES.testSSO, element: <TrackingSSO /> },
];

export { routes };
