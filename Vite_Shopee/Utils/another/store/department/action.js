import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const keyReducer = {
  search: 'department/search',
  create: 'department/create',
  delete: 'department/delete',
  filter: 'department/filter',
  update: 'department/update',
  searchBackup: 'department/searchBackup',
  historyDetail: 'department/history_detail',
};
const searchDepartment = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.department.search(params),
  });
  return res;
});

const searchDepartmentBackup = createAsyncThunk(keyReducer.searchBackup, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.department.filter,
    data: params,
  });
  return res;
});

const filterDepartment = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally = () => {} } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.department.filter,
    onSuccess,
    onFinally,
    data: params,
  });
  return res;
});

const createDepartment = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.department.create,
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const deleteDepartment = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.department.delete,
    data,
    onSuccess,
    textSuccess: 'DELETED_SUCCESS',
  });
  return res;
});

const updateDepartment = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.department.update,
    data,
    onSuccess,
    textSuccess: 'UPDATED_SUCCESS',
  });
  return res;
});

const historyDetailDepartment = createAsyncThunk(keyReducer.historyDetail, async (payload) => {
  const { departmentId, id } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.department.historyDetail(departmentId, id),
  });
  return res;
});

export {
  searchDepartment,
  createDepartment,
  deleteDepartment,
  filterDepartment,
  updateDepartment,
  searchDepartmentBackup,
  historyDetailDepartment,
};
