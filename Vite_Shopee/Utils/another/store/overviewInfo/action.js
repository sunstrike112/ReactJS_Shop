import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';
import { TYPE_NOT_TOAST } from 'dhm/utils/constants/type';

const key = 'overviewInfo';

const keyReducer = {
  get: `${key}/search`,
  getEsMngPred: `${key}/getEsMngPred`,
  update: `${key}/update`,
  history: `${key}/history`,
};
const getOverviewInfo = createAsyncThunk(keyReducer.get, async (payload) => {
  const { employeeId } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.overviewInfo.get(employeeId),
    type: TYPE_NOT_TOAST.GET_OVERVIEWINFO,
  });
  return res;
});

const getEsMngPred = createAsyncThunk(keyReducer.getEsMngPred, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.overviewInfo.getEsMngPred,
    data: params,
  });
  return res;
});

const getHistoryOVerviewInfo = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.overviewInfo.history(params.employeeId),
    data: params,
  });
  return res;
});

const updateOverviewInfo = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'postForm',
    url: API_APP.overviewInfo.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

export { getOverviewInfo, getHistoryOVerviewInfo, updateOverviewInfo, getEsMngPred };
