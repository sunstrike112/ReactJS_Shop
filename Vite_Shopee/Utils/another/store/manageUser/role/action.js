import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'role';

const keyReducer = {
  search: `${key}/search`,
  create: `${key}/create`,
  delete: `${key}/delete`,
  filter: `${key}/filter`,
  update: `${key}/update`,
  history: `${key}/history`,
  permission: `${key}/permission`,
  detailPermission: `${key}/detailPermission`,
};
const searchRole = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.role.filter,
    data: params,
  });
  return res;
});

const historyRole = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.role.history,
    data: params,
  });
  return res;
});

const filterRole = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.role.filter,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const createRole = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.role.create,
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const deleteRole = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.manageUser.role.delete(data.id),
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateRole = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.manageUser.role.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const getListPermission = createAsyncThunk(keyReducer.permission, async (payload) => {
  const { onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.manageUser.role.permission,
    onSuccess,
  });
  return res;
});

const getDetailPermission = createAsyncThunk(keyReducer.detailPermission, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.manageUser.role.detailPermission(data.id),
    onSuccess,
  });
  return res;
});

export {
  searchRole,
  filterRole,
  createRole,
  deleteRole,
  updateRole,
  historyRole,
  getListPermission,
  getDetailPermission,
};
