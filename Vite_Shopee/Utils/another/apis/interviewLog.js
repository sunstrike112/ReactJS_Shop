export const apiInterviewLog = {
  get: (employeeId) => `/mst/interview-log/filter/${employeeId}`,
  history: (employeeId) => `/mst/interview-log/filter/${employeeId}`,
  create: `/mst/interview-log`,
  update: `/mst/interview-log-past-log`,
  getEsMngPred: `/mst/es-mng-pred/filter`,
};
