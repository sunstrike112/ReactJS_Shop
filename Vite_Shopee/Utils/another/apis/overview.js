export const apiOverview = {
  get: (employeeId) => `/summary/overview/${employeeId}`,
  update: `/summary/overview`,
  history: (employeeId) => `/summary/overview/${employeeId}/history`,
  getEsMngPred: `/mst/es-mng-pred/filter`,
};
