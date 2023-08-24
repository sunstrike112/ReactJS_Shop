export const apiProjectInfo = {
  get: (employeeId) => `/mst/project-info/filter/${employeeId}`,
  history: (employeeId) => `/mst/project-info/filter/${employeeId}`,
  create: `/mst/project-info`,
  update: `/mst/project-info-past-log`,
};
