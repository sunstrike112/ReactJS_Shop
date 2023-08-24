import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'trainingMaster';

const keyReducer = {
  search: `${key}/search`,
  create: `${key}/create`,
  delete: `${key}/delete`,
  filter: `${key}/filter`,
  update: `${key}/update`,
  history: `${key}/history`,
};
const searchTrainingMaster = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.trainingMaster.filter,
    data: params,
  });
  return res;
});

const historyTrainingMaster = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.trainingMaster.history,
    data: params,
  });
  return res;
});

const filterTrainingMaster = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.trainingMaster.filter,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const createTrainingMaster = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.trainingMaster.create,
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const deleteTrainingMaster = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.trainingMaster.delete,
    data,
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateTrainingMaster = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.trainingMaster.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

export {
  searchTrainingMaster,
  historyTrainingMaster,
  filterTrainingMaster,
  createTrainingMaster,
  deleteTrainingMaster,
  updateTrainingMaster,
};
