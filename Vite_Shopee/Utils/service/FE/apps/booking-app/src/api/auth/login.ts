import baseApi from '@ss-fe-fw/booking/api/base-api';
import { AUTH_CUSTOMER_ENDPOINT } from '@ss-fe-fw/booking/constants';

async function loginApi(payload) {
  return await baseApi(
    AUTH_CUSTOMER_ENDPOINT.BASE + AUTH_CUSTOMER_ENDPOINT.LOGIN,
    'POST',
    payload
  );
}

export default loginApi;
