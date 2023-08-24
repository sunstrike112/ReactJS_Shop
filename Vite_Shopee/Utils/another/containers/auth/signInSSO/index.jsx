import { Button, Img } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import OAuth2Login from 'dhm/components/Auth0Simple';
// import showToast from 'dhm/components/Toast';
// import { TOAST_STATUS } from 'dhm/components/Toast/dataToast';
import { SessionStore } from 'dhm/utils/helpers/local';

export function getRandomInteger(range) {
  const max_range = 256;

  const byteArray = new Uint8Array(1);
  window.crypto.getRandomValues(byteArray);

  if (byteArray[0] >= Math.floor(max_range / range) * range) return getRandomInteger(range);
  return byteArray[0] % range;
}

export async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(codeVerifier);
  const hash = await window.crypto.subtle.digest('SHA-256', bytes);
  const hashString = String.fromCharCode(...new Uint8Array(hash));
  const base64 = btoa(hashString);
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(getRandomInteger(possible.length - 1));
  }
  return text;
}
const codeVerifier = generateRandomString(96);

export function ButtonSSOSignIn() {
  const { set } = SessionStore;
  const onSuccess = (response) => {
    generateCodeChallenge(codeVerifier).then((res) => {
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope: import.meta.env.VITE_SCOPE,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code_challenge: res,
        code_challenge_method: 'S256',
        state: '12345',
        response_mode: 'query',
      });
      const url = `${import.meta.env.VITE_AUTHORITY}?${params}`;
      window.location.replace(url);
      set('code_verifier', codeVerifier);
    });
    return response;
  };

  const onFailure = (response) =>
    // showToast('Have an error when signing in with Microsoft. Please try again later.', TOAST_STATUS.error);
    response;
  return (
    <>
      <OAuth2Login
        authorizationUrl={import.meta.env.VITE_AUTHORITY}
        responseType='token'
        clientId={import.meta.env.VITE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        scope={import.meta.env.VITE_SCOPE}
        redirectUri={import.meta.env.VITE_REDIRECT_URI}
        render={({ onClick }) => (
          <Button width='100%' leftIcon={<Img src={DHMAssets.ICON_MICROSOFT} alt='microsoft' />} onClick={onClick}>
            Microsoft
          </Button>
        )}
        extraParams={{
          grant_type: 'authorization_code',
        }}
      />
    </>
  );
}
