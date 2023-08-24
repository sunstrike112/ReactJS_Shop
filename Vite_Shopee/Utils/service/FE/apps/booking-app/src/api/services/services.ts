import baseApi from '@ss-fe-fw/booking/api/base-api';
import { SERVICE_ENDPOINT } from '@ss-fe-fw/booking/constants';

export async function getServicesWithPackages() {
  const payload = {
    "where": {
      "isActive": true
    },
    "orderBy": { "order": "asc" },
    "include": {
      "packages": {
        "where": {
            "isActive": true
        },
        "orderBy": { "order": "asc" }
      }
    }
  }

  return await getServices(payload);
}

export async function getServices(payload) {
  return await baseApi(SERVICE_ENDPOINT.BASE + SERVICE_ENDPOINT.SEARCH, 'POST', payload);
}
