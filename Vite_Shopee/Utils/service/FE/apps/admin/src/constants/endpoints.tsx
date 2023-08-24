export const LOGIN_ENDPOINT = '/auth/login';
export const REFRESH_ENDPOINT = '/auth/refresh';
export const PROFILE_ENDPOINT = {
  BASE: '/auth/profiles',
  CHANGE_PASSWORD: '/change-password',
}


export const AUTH_ENDPOINT = {
  BASE: '/auth',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
};

export const TWO_FA_ENDPOINT = {
  BASE: AUTH_ENDPOINT.BASE + '/2fa',
  LOGIN: '/login',
  TOGGLE_SETTING: '/toggle-setting',
  QR_CODE: '/qr-code',
};

export const ORGANIZATIONS_ENDPOINT = {
  BASE: '/organizations',
  SEARCH: '/search',
};

export const USER_ENDPOINT = {
  BASE: '/users',
  PERMISSIONS: '/users/{id}/permissions'
}

export const ROLE_ENPOINT = {
  BASE: '/roles',
  DETAIL: '/roles/{id}',
  SEARCH: '/search'
}
