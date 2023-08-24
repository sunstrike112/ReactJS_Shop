import { getRefreshToken } from 'dhm/components/Auth0Simple/method';
import { LoadingAnimation } from 'dhm/components/Loading/LoadingAnimation';
import { AuthContext } from 'dhm/contexts/AuthContext';
import { signInSSO } from 'dhm/store/auth/action';
import { LocalStore, SessionStore } from 'dhm/utils/helpers/local';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function TrackingSSO() {
  const urlParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const { handleSignIn } = useContext(AuthContext);
  const { get } = SessionStore;
  const { set: setLocal } = LocalStore;
  const code = urlParams.get('code');
  const codeVerifier = get('code_verifier');

  useEffect(() => {
    const callbackRefreshToken = (res) => {
      if (res?.error) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }
      setLocal('user_profile', res);
      setLocal('code', code);
      setLocal('code_verifier', codeVerifier);
      setLocal('access_token', res?.access_token);
      const data = { accessToken: res?.access_token };
      const payload = {
        data,
        onSuccess: handleSignIn,
      };

      dispatch(signInSSO(payload));
    };
    getRefreshToken(callbackRefreshToken, code, codeVerifier);
  }, []);
  return <LoadingAnimation />;
}
