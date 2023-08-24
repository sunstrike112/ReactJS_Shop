import baseApi from '@ss-fe-fw/booking/api/base-api';
import { CUSTOMER_ENDPOINT } from '@ss-fe-fw/booking/constants';

async function registerApi(payload) {
  return await baseApi(CUSTOMER_ENDPOINT.BASE, 'POST', payload);
}

export default registerApi;
