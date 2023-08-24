export const apiFileUpload = {
  deleteFile: (employeeId, fileName) => `/files/${employeeId}/${fileName}`,
  getListEmployeeId: `/files/employee-list`,
  getPublicAccessUrlFile: (employeeId, fileName, version) => `/files/url/${employeeId}/${fileName}?version=${version}`,
  getAllFileVersion: (employeeId, fileName) => `/files/version/${employeeId}/${fileName}`,
  getListAllFile: `/files`,
  getAllFileByEmployeeId: (employeeId) => `/files/${employeeId}`,
  uploadFileByEmployeeId: (employeeId) => `/files/${employeeId}`,
};
