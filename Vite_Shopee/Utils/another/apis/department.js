import { verifyParams } from 'dhm/utils/helpers/format';

export const apiDepartment = {
  search: (params) => `/mst/department/search${verifyParams(params)}`,
  filter: `/mst/department/filter`,
  detail: (id) => `/mst/department/${id}`,
  update: '/mst/department',
  create: '/mst/department',
  delete: '/mst/department',
  historyDetail: (idDepartment, id) => `/mst/department/${idDepartment}/${id}`,
};
