import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'projectInfo';

const keyReducer = {
  get: `${key}/get`,
  create: `${key}/create`,
  update: `${key}/update`,
  history: `${key}/history`,
  clear: `${key}/clear`,
};
const getProjectInfo = createAsyncThunk(keyReducer.get, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.projectInfo.get(params.employeeId),
    data: params,
  });
  return res;
});

const getHistoryProjectInfo = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.projectInfo.history(params.employeeId),
    data: params,
  });
  return res;
});

const createProjectInfo = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.projectInfo.create,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const clearConfirmProjectInfo = createAction(keyReducer.clear);

const updateProjectInfo = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.projectInfo.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

export { getProjectInfo, createProjectInfo, updateProjectInfo, getHistoryProjectInfo, clearConfirmProjectInfo };
