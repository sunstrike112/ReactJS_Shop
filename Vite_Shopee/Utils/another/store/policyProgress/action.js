import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'policyProgress';

const keyReducer = {
  get: `${key}/search`,
  getTobeFY: `${key}/getTobeFY`,
  update: `${key}/update`,
  historyPolicyProgress: `${key}/historyPolicyProgress`,
  historyPromotion: `${key}/historyPromotion`,
  historyTRisk: `${key}/historyTRisk`,
  delete: `${key}/delete`,
};
const getPolicyProgress = createAsyncThunk(keyReducer.get, async (payload) => {
  const { employeeId } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.policyProgress.get(employeeId),
  });
  return res;
});

const getTobeFY = createAsyncThunk(keyReducer.getTobeFY, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.policyProgress.getTobeFY,
    data: params,
  });
  return res;
});

const getHistoryPolicyProgress = createAsyncThunk(keyReducer.historyPolicyProgress, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.policyProgress.historyPolicyProgress(params.employeeId),
    data: params,
  });
  return res;
});

const deletePolicyProgress = createAsyncThunk(keyReducer.delete, async (payload) => {
  const res = await callApi({
    method: 'delete',
    url: API_APP.policyProgress.delete(payload.data),
    textSuccess: 'DELETED_SUCCESS',
    onSuccess: payload.onSuccess,
    data: payload.paramsWF,
  });
  return res;
});

const getHistoryPromotion = createAsyncThunk(keyReducer.historyPromotion, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.policyProgress.historyPromotion(params.employeeId),
    data: params,
  });
  return res;
});

const getHistoryTRisk = createAsyncThunk(keyReducer.historyTRisk, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.policyProgress.historyTRisk(params.employeeId),
    data: params,
  });
  return res;
});

const updatePolicyProgress = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.policyProgress.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

export {
  getPolicyProgress,
  getHistoryPolicyProgress,
  getHistoryPromotion,
  getHistoryTRisk,
  updatePolicyProgress,
  deletePolicyProgress,
  getTobeFY,
};
