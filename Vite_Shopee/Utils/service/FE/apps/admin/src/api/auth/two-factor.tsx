import baseApi from '@ss-fe-fw/api/base-api';
import { TWO_FA_ENDPOINT } from '@ss-fe-fw/constants';

export async function login2FAApi(payload) {
  return await baseApi(TWO_FA_ENDPOINT.BASE + TWO_FA_ENDPOINT.LOGIN, 'POST', payload);
}

export async function setup2FAApi(payload) {
  return await baseApi(TWO_FA_ENDPOINT.BASE + TWO_FA_ENDPOINT.TOGGLE_SETTING, 'POST', payload);
}

export async function getQrCodeApi() {
  return await baseApi(TWO_FA_ENDPOINT.BASE + TWO_FA_ENDPOINT.QR_CODE, 'GET', {});
}
