import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'interviewLog';

const keyReducer = {
  getEsMngPred: `${key}/getEsMngPred`,
  get: `${key}/get`,
  create: `${key}/create`,
  update: `${key}/update`,
  history: `${key}/history`,
};

const getInterviewLog = createAsyncThunk(keyReducer.get, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.interviewLog.get(params.employeeId),
    data: params,
  });
  return res;
});

const getEsMngPred = createAsyncThunk(keyReducer.getEsMngPred, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.interviewLog.getEsMngPred,
    data: params,
  });
  return res;
});

const getHistoryInterviewLog = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.interviewLog.history(params.employeeId),
    data: params,
  });
  return res;
});

const createInterviewLog = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.interviewLog.create,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateInterviewLog = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.interviewLog.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

export { getInterviewLog, getHistoryInterviewLog, createInterviewLog, updateInterviewLog, getEsMngPred };
