import baseApi from '@ss-fe-fw/api/base-api';
import { REFRESH_ENDPOINT } from '@ss-fe-fw/constants';

async function refreshTokenApi(payload) {
  return await baseApi(REFRESH_ENDPOINT, 'POST', payload);
}

export default refreshTokenApi;
