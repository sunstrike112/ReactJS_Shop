export class FetchError extends Error {
  //   status: number;
  //   statusText: string;

  constructor(status, statusText, message) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.statusText = statusText;
  }
}

function buildUrlEncodedRequest(request) {
  let queryString = '';
  Object.entries(request).forEach(([key, value]) => {
    queryString += `${(queryString ? '&' : '') + key}=${encodeURIComponent(value)}`;
  });
  return queryString;
}

async function postWithXForm(url, request) {
  return fetch(url, {
    method: 'POST',
    body: buildUrlEncodedRequest(request),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).then(async (response) => {
    if (!response.ok) {
      const responseBody = await response.text();
      throw new FetchError(response.status, response.statusText, responseBody);
    }
    return response;
  });
}
function isTokenResponse(body) {
  return body?.access_token !== undefined;
}
export function postTokenRequest(tokenEndpoint, tokenRequest) {
  return postWithXForm(tokenEndpoint, tokenRequest).then((response) =>
    response.json().then((body) => {
      if (isTokenResponse(body)) {
        return body;
      }
      throw Error(body);
    }),
  );
}

export const fetchWithRefreshToken = (props) => {
  const { config, refreshToken } = props;
  const refreshRequest = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    scope: config.scope,
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
  };
  return postTokenRequest(config.tokenEndpoint, refreshRequest);
};

export const fetchTokens = (config) => {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code');
  //   const codeVerifier = window.localStorage.getItem(codeVerifierStorageKey);

  if (!authCode) {
    throw Error("Parameter 'code' not found in URL. \nHas authentication taken place?");
  }

  const tokenRequest = {
    grant_type: 'authorization_code',
    code: authCode,
    scope: import.meta.env.VITE_SCOPE,
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    code_verifier: '123456',
  };
  return postTokenRequest(config.tokenEndpoint, tokenRequest);
};

export const getRefreshToken = (cb, code, codeVerifier, type = 'authorization_code') =>
  fetch(import.meta.env.VITE_ENDPOINT_REFRESH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=${type}&code=${code}&scope=${import.meta.env.VITE_SCOPE}&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&code_verifier=${codeVerifier}`,
  })
    .then((res) => res.json())
    .then((res) => cb(res));

export const getRefreshTokenNoCode = (cb, refreshToken = null, type = 'refresh_token') =>
  fetch(import.meta.env.VITE_ENDPOINT_REFRESH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=${type}&refresh_token=${refreshToken}&scope=${import.meta.env.VITE_SCOPE}&client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`,
  })
    .then((res) => res.json())
    .then((res) => cb(res));
