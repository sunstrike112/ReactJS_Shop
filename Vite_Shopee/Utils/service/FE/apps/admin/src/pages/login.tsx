/* eslint-disable @nrwl/nx/enforce-module-boundaries */

// import local
import { LOGIN_SCREEN_STATE } from '@ss-fe-fw/constants';
import { OGBasePageComponent, OGLoginForm, OGServiceCentreForm, OGVerificationCodeForm } from '@ss-fe-fw/organisms';
import { serviceCentreState } from '@ss-fe-fw/stores';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useResetRecoilState } from 'recoil';

export function Login() {
  const [state, setState] = useState(LOGIN_SCREEN_STATE.INITIAL);
  const [serviceCentres, setServiceCentres] = useState([]);
  const [, setCookie] = useCookies(['Refresh']);
  const resetServiceCentreState = useResetRecoilState(serviceCentreState);

  const changeState = useCallback((newState) => {
    if (newState === LOGIN_SCREEN_STATE.INITIAL) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      Cookies.remove('Refresh');
      resetServiceCentreState();
    }

    setState(newState);
  }, []);

  const signInSuccess = useCallback((userResult) => {
    if (userResult.status) {
      return;
    }

    localStorage.setItem('accessToken', userResult.accessToken);
    if (userResult.isTwoFactorAuthenticationEnabled === true && userResult.id === undefined) {
      setState(LOGIN_SCREEN_STATE.VERIFICATION_CODE);
      return;
    }

    setState(LOGIN_SCREEN_STATE.SERVICE_CENTRE);
    localStorage.setItem('refreshToken', userResult.refreshToken);
    setCookie('Refresh', userResult.refreshToken, { path: '/' })
    setServiceCentres(userResult.organizations);
    // setCookie('Authentication', userResult.accessToken, { path: '/' });

    // return router.push('/');
  }, []);

  let screen = null;
  switch (state) {
    case LOGIN_SCREEN_STATE.SERVICE_CENTRE:
      screen = <OGServiceCentreForm setState={changeState} serviceCentres={serviceCentres} />
      break;

    case LOGIN_SCREEN_STATE.VERIFICATION_CODE:
      screen = <OGVerificationCodeForm setState={changeState} signInSuccess={signInSuccess} />
      break;

    default:
      screen = <OGLoginForm setState={changeState} signInSuccess={signInSuccess} />
      break;
  }

  return (
    <OGBasePageComponent>
      {screen}
    </OGBasePageComponent>
  )
}

export default Login;
