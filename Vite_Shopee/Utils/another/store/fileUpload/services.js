import { TYPE_RETIREMENT } from 'dhm/utils/constants/type';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFile,
  getAllFileVersion,
  getListAllFile,
  getListEmployeeId,
  uploadFileByEmployeeId,
  getPublicAccessUrlFile,
} from './action';

export const ServiceFileUpload = () => {
  const { listAllFile, listEmployeeId, listFileVersion, loadingFileUpload, loadingListEmployeeId, urlFile } =
    useSelector((state) => state.fileUpload);
  const dispatch = useDispatch();
  const getListAllFileAction = () => dispatch(getListAllFile());
  const getListEmployeeIdAction = () => dispatch(getListEmployeeId());
  const uploadFileByEmployeeIdAction = (payload) => dispatch(uploadFileByEmployeeId(payload));
  const getAllFileVersionAction = (payload) => dispatch(getAllFileVersion(payload));
  const getPublicAccessUrlFileAction = (payload) => dispatch(getPublicAccessUrlFile(payload));
  const deleteFileAction = (payload) => dispatch(deleteFile(payload));

  const OPTION_EMPLOYEE_ID = listEmployeeId.map((employee) => ({
    value: employee.employeeId,
    employeeName: employee.employeeName,
    label:
      employee.retirement === TYPE_RETIREMENT.RETIREMENT.CODE
        ? `${employee.employeeId} (${TYPE_RETIREMENT.RETIREMENT.NAME})`
        : employee.employeeId,
  }));

  const LIST_EMPLOYEE_ID = listEmployeeId.map((employee) => employee.employeeId);

  return {
    OPTION_EMPLOYEE_ID,
    listAllFile,
    listFileVersion,
    urlFile,
    listEmployeeId,
    LIST_EMPLOYEE_ID,
    loadingFileUpload,
    loadingListEmployeeId,
    getListAllFileAction,
    getListEmployeeIdAction,
    uploadFileByEmployeeIdAction,
    getAllFileVersionAction,
    deleteFileAction,
    getPublicAccessUrlFileAction,
  };
};
