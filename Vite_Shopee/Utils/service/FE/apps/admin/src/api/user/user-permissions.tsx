import baseApi from '@ss-fe-fw/api/base-api';
import { ROLE_ENPOINT, USER_ENDPOINT } from '@ss-fe-fw/constants';

export async function updateUserRoles(payload, id) {
  const url = USER_ENDPOINT.PERMISSIONS.replace('{id}', id);

  return await baseApi(url, 'PATCH', payload);
}

export async function getRoleDetail(id, query) {
  const url = ROLE_ENPOINT.DETAIL.replace('{id}', id);

  return await await baseApi(url, 'POST', query);
}

export async function deleteUserRole(payload, id) {
  const url = USER_ENDPOINT.PERMISSIONS.replace('{id}', id);

  return await baseApi(url, 'DELETE', payload);
}