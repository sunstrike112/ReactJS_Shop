import baseApi from '@ss-fe-fw/booking/api/base-api';
import { COUNTRIES_ENDPOINT } from '@ss-fe-fw/booking/constants';

export async function getStateOfCountry(payload) {
  return await baseApi(`${COUNTRIES_ENDPOINT.BASE}/${payload}/states`, 'GET');
}
