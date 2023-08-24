import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'userManager';

const keyReducer = {
  search: `${key}/search`,
  create: `${key}/create`,
  filter: `${key}/filter`,
  update: `${key}/update`,
  history: `${key}/history`,
  import: `${key}/import`,
};
const searchUser = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.user.filter,
    data: params,
  });
  return res;
});

const historyUser = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.user.history,
    data: params,
  });
  return res;
});

const filterUser = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.user.filter,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const createUser = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.manageUser.user.create,
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const updateUser = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.manageUser.user.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
    noVerifyPost: true,
  });
  return res;
});

const importUser = createAsyncThunk(keyReducer.import, async (payload) => {
  const { file, onSuccess = () => {}, onFailed = () => {} } = payload;
  const res = await callApi({
    method: 'postFile',
    url: API_APP.manageUser.user.import,
    onSuccess,
    data: file,
    onFailed,
    textSuccess: 'IMPORT_SUCCESS',
    keyPostfile: 'fileMap',
  });
  return res;
});
export { searchUser, filterUser, createUser, updateUser, historyUser, importUser };
