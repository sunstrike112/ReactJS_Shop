export const apiEsMaster = {
  filter: '/mst/es-mng-pred/filter',
  history: '/mst/es-mng-pred/filter',
  delete: '/mst/es-mng-pred',
  update: '/mst/es-mng-pred',
  create: '/mst/es-mng-pred',
  dropdown: '/mst/es-mng-pred/usercode-leader',
  checkleader: (belong) => `/mst/es-mng-pred/check-leader?esMngBelong=${belong}`,
};
