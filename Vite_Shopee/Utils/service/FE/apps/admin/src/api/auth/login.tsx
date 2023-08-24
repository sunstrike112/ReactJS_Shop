import baseApi from '@ss-fe-fw/api/base-api';
import { LOGIN_ENDPOINT } from '@ss-fe-fw/constants';

async function loginApi(payload) {
  return await baseApi(LOGIN_ENDPOINT, 'POST', payload);
}

export default loginApi;
