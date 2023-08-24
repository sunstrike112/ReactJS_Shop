import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'fileUpload';

const keyReducer = {
  deleteFile: `${key}/deleteFile`,
  getListEmployeeId: `${key}/getListEmployeeId`,
  getPublicAccessUrlFile: `${key}/getPublicAccessUrlFile`,
  getAllFileVersion: `${key}/getAllFileVersion`,
  getListAllFile: `${key}/getListAllFile`,
  getAllFileByEmployeeId: `${key}/getAllFileByEmployeeId`,
  uploadFileByEmployeeId: `${key}/uploadFileByEmployeeId`,
};
const getListAllFile = createAsyncThunk(keyReducer.getListAllFile, async () => {
  const res = await callApi({
    method: 'get',
    url: API_APP.fileUpload.getListAllFile,
  });
  return res;
});

const getListEmployeeId = createAsyncThunk(keyReducer.getListEmployeeId, async () => {
  const res = await callApi({
    method: 'get',
    url: API_APP.fileUpload.getListEmployeeId,
  });
  return res;
});

const getAllFileVersion = createAsyncThunk(keyReducer.getAllFileVersion, async (payload) => {
  const { employeeId, fileName } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.fileUpload.getAllFileVersion(employeeId, fileName),
  });
  return res;
});

const getPublicAccessUrlFile = createAsyncThunk(keyReducer.getPublicAccessUrlFile, async (payload) => {
  const { employeeId, fileName, version } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.fileUpload.getPublicAccessUrlFile(employeeId, fileName, version),
  });
  return res;
});

const deleteFile = createAsyncThunk(keyReducer.deleteFile, async (payload) => {
  const { employeeId, fileName, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    onSuccess,
    url: API_APP.fileUpload.deleteFile(employeeId, fileName),
  });
  return res;
});

const uploadFileByEmployeeId = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, employeeId, onSuccess } = payload;
  const res = await callApi({
    method: 'putForm',
    url: API_APP.fileUpload.uploadFileByEmployeeId(employeeId),
    data,
    onSuccess,
    textSuccess: 'UPLOAD_SUCCESS',
  });
  return { employeeId, res };
});

export {
  getListAllFile,
  uploadFileByEmployeeId,
  getListEmployeeId,
  getAllFileVersion,
  getPublicAccessUrlFile,
  deleteFile,
};
