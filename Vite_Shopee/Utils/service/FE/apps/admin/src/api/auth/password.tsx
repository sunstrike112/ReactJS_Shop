import baseApi from '@ss-fe-fw/api/base-api';
import { AUTH_ENDPOINT, PROFILE_ENDPOINT } from '@ss-fe-fw/constants';

export async function forgotPasswordApi(payload) {
  return await baseApi(AUTH_ENDPOINT.BASE + AUTH_ENDPOINT.FORGOT_PASSWORD, 'POST', payload);
}

export async function resetPasswordApi(payload) {
  return await baseApi(AUTH_ENDPOINT.BASE + AUTH_ENDPOINT.RESET_PASSWORD, 'POST', payload);
}

export async function changePasswordApi(payload) {
  return await baseApi(PROFILE_ENDPOINT.BASE + PROFILE_ENDPOINT.CHANGE_PASSWORD, 'PATCH', payload);
}
