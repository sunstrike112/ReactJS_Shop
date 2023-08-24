export const apiOvertime = {
  importOvertime: `/summary/overtime/import`,
  create: `/summary/overtime`,
  update: `/summary/overtime`,
  history: `/summary/overtime/history-setting`,
  get: (employeeId, fiscalYear) => `/summary/overtime/${employeeId}/fiscal-year?fiscalYear=${fiscalYear}`,
  getYearOvertimeSetting: (fiscalYear) => `/summary/overtime/${fiscalYear}`,
};
