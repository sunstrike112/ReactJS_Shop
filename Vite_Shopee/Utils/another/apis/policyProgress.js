export const apiPolicyProgress = {
  get: (employeeId) => `/mst/policy-prog/${employeeId}`,
  update: `/mst/policy-prog`,
  delete: (employeeId) => `/mst/policy-prog/${employeeId}`,
  historyPolicyProgress: (employeeId) => `/mst/policy-prog/history/${employeeId}/main`,
  historyTRisk: (employeeId) => `/mst/policy-prog/history/${employeeId}/risk`,
  historyPromotion: (employeeId) => `/mst/policy-prog/history/${employeeId}/prom`,
  getTobeFY: `/mst/code-master/filter`,
};
