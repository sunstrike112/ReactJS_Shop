import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'workflow';

const keyReducer = {
  getImportProcessList: `${key}/getImportProcessList`,
  getListApproverAndAgent: `${key}/getListApproverAndAgent`,
  assignImportProcess: `${key}/assignImportProcess`,
  getProcessListIncomplete: `${key}/getProcessListIncomplete`,
  getProcessListCompleted: `${key}/getProcessListCompleted`,
  getHistoryProcess: `${key}/getHistoryProcess`,
  updateProcess: `${key}/updateProcess`,
  getDetailProcess: `${key}/getDetailProcess`,
};

const getImportProcessList = createAsyncThunk(keyReducer.getImportProcessList, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.workflow.getImportProcessList,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const getProcessListIncomplete = createAsyncThunk(keyReducer.getProcessListIncomplete, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.workflow.getProcessListIncomplete,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const getProcessListCompleted = createAsyncThunk(keyReducer.getProcessListCompleted, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.workflow.getProcessListCompleted,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const getHistoryProcess = createAsyncThunk(keyReducer.getHistoryProcess, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.workflow.getHistoryProcess(params.matterNo),
    data: params,
  });
  return res;
});

const getDetailProcess = createAsyncThunk(keyReducer.getDetailProcess, async (payload) => {
  const res = await callApi({
    method: 'get',
    url: API_APP.workflow.getDetailProcess(payload),
  });
  return res;
});

const getListApproverAndAgent = createAsyncThunk(keyReducer.getListApproverAndAgent, async () => {
  const res = await callApi({
    method: 'get',
    url: API_APP.workflow.getListApproverAndAgent,
  });
  return res;
});

const assignImportProcess = createAsyncThunk(keyReducer.assignImportProcess, async (payload) => {
  const { params, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.workflow.assignImportProcess,
    data: params,
    onSuccess,
    textSuccess: 'UPDATED_SUCCESS',
  });
  return res;
});

const updateProcess = createAsyncThunk(keyReducer.updateProcess, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.workflow.updateProcess,
    data,
    onSuccess,
    textSuccess: 'UPDATED_SUCCESS',
  });
  return res;
});

export {
  getImportProcessList,
  assignImportProcess,
  getListApproverAndAgent,
  getProcessListIncomplete,
  getProcessListCompleted,
  getHistoryProcess,
  updateProcess,
  getDetailProcess,
};
