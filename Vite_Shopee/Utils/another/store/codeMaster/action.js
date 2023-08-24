import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'codeMaster';

export const keyReducer = {
  codeListId: `${key}/codeListId`,
  allHistory: `${key}/allHistory`,
  filter: `${key}/filter`,
  create: `${key}/create`,
  history: `${key}/history`,
  delete: `${key}/delete`,
  update: `${key}/update`,
  clearData: `${key}/clear`,
  exportCsv: `${key}/exportCsv`,
  importCsv: `${key}/importCsv`,
  search: `${key}/search`,
};

const getDropdownCodeListID = createAsyncThunk(keyReducer.codeListId, async () => {
  const res = await callApi({
    method: 'get',
    url: API_APP.codeMaster.dropdown,
  });
  return res;
});

const historyAllDisplay = createAsyncThunk(keyReducer.allHistory, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    data: params,
    url: API_APP.codeMaster.filter,
  });
  return res;
});

const filterCodeMaster = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally = () => {} } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.codeMaster.filter,
    onSuccess,
    onFinally,
    data: params,
  });
  return res;
});

const searchDetailDisplay = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.codeMaster.filter,
    data: params,
  });
  return res;
});

const deleteCodeMasterAllDisplay = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess, onFinally = () => {} } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.codeMaster.create,
    onSuccess,
    onFinally,
    data,
    textSuccess: 'DELETED_SUCCESS',
  });
  return res;
});

const addCodeMaster = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess, onFinally = () => {} } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.codeMaster.create,
    onSuccess,
    onFinally,
    data,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const updateCodeMaster = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess, onFinally = () => {} } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.codeMaster.create,
    onSuccess,
    onFinally,
    data,
    textSuccess: 'UPDATED_SUCCESS',
  });
  return res;
});

const resetDataDetail = createAction(keyReducer.clearData);

const exportCsv = createAsyncThunk(keyReducer.exportCsv, async (payload) => {
  const { onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.codeMaster.exportCsv,
    onSuccess,
  });
  return res;
});

const importCsv = createAsyncThunk(keyReducer.importCsv, async (payload) => {
  const { file, onSuccess = () => {}, onFailed = () => {} } = payload;
  const res = await callApi({
    method: 'postFile',
    url: API_APP.codeMaster.importCsv,
    onSuccess,
    data: file,
    onFailed,
    textSuccess: 'IMPORT_SUCCESS',
  });
  return res;
});

const codeMasterAction = {
  exportCsv,
  importCsv,
};
export {
  historyAllDisplay,
  filterCodeMaster,
  searchDetailDisplay,
  deleteCodeMasterAllDisplay,
  addCodeMaster,
  updateCodeMaster,
  resetDataDetail,
  getDropdownCodeListID,
  codeMasterAction,
};
