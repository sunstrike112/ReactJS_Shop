const role = {
  filter: '/role/filter',
  update: '/role/update',
  create: '/role/create',
  permission: '/role/permission-menu',
  delete: (id) => `/role/${id}`,
  detailPermission: (id) => `/role/permission-role/${id}`,
};
const user = {
  filter: '/user/filter',
  history: '/user/filter',
  update: '/user/update',
  create: '/user/create',
  import: '/user/import',
};

export const apiManageUser = {
  role,
  user,
};
