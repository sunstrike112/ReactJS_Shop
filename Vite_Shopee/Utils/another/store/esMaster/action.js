import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'esMaster';

const keyReducer = {
  search: `${key}/search`,
  create: `${key}/create`,
  delete: `${key}/delete`,
  filter: `${key}/filter`,
  update: `${key}/update`,
  history: `${key}/history`,
  dropdown: `${key}/dropdown`,
  checkLeader: `${key}/check-leader`,
};
const searchEsMaster = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.esMaster.filter,
    data: params,
  });
  return res;
});

const historyEsMaster = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.esMaster.history,
    data: params,
  });
  return res;
});

const filterEsMaster = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.esMaster.filter,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const createEsMaster = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.esMaster.create,
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const deleteEsMaster = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.esMaster.delete,
    data,
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateEsMaster = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.esMaster.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const getDropdown = createAsyncThunk(keyReducer.dropdown, async (payload) => {
  const { onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.esMaster.dropdown,
    onSuccess,
  });
  return res;
});

const getCheckLeaderEsMaster = createAsyncThunk(keyReducer.checkLeader, async (payload) => {
  const { esLeader } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.esMaster.checkleader(esLeader),
  });
  return res;
});

export {
  searchEsMaster,
  filterEsMaster,
  createEsMaster,
  deleteEsMaster,
  updateEsMaster,
  historyEsMaster,
  getDropdown,
  getCheckLeaderEsMaster,
};
