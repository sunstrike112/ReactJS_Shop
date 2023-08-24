import baseApi from '@ss-fe-fw/api/base-api';
import { ORGANIZATIONS_ENDPOINT } from '@ss-fe-fw/constants';

export async function getServiceCentres() {
  const payload = {
    "where": {
      "isActive": true
    }
  }

  return await getOrganizations(payload);
}

export async function getOrganizations(payload) {
  return await baseApi(ORGANIZATIONS_ENDPOINT.BASE + ORGANIZATIONS_ENDPOINT.SEARCH, 'POST', payload);
}
