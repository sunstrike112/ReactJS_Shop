import baseApi from '@ss-fe-fw/booking/api/base-api';
import { ORGANIZATIONS_ENDPOINT } from '@ss-fe-fw/booking/constants';

export async function getServiceCentres() {
  const payload = {
    where: {
      isActive: true,
    },
  };

  return await getOrganizations(payload);
}

export async function getOrganizations(payload) {
  return await baseApi(
    ORGANIZATIONS_ENDPOINT.BASE + ORGANIZATIONS_ENDPOINT.SEARCH,
    'POST',
    payload
  );
}

export async function getDetailOrganizationById(id) {
  return await baseApi(ORGANIZATIONS_ENDPOINT.BASE + '/' + id, 'POST');
}
