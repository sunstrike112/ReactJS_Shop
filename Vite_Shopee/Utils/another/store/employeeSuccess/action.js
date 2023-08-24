import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'employeeSuccess';
const keyReducer = {
  getDetail: `${key}/getDetail`,
  update: `${key}/update`,
  delete: `${key}/delete`,
  historyRada: `${key}/historyRada`,
  historyKof: `${key}/historyKof`,
  historyMotivation: `${key}/historyMotivation`,
};

const getDetailEmployeeSuccess = createAsyncThunk(keyReducer.getDetail, async (payload) => {
  const { id } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.employeeSuccess.getDetail(id),
  });
  return res;
});

const updateEmloyeeSuccess = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.employeeSuccess.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});
const deleteEmployeeSuccess = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.employeeSuccess.delete,
    data: { workflow: payload.paramsWF, ...data },
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

const historyKof = createAsyncThunk(keyReducer.historyKof, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.employeeSuccess.historyKof,
    data: params,
  });
  return res;
});

const historyRada = createAsyncThunk(keyReducer.historyRada, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.employeeSuccess.historyRada,
    data: params,
  });
  return res;
});

const historyMotivation = createAsyncThunk(keyReducer.historyMotivation, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.employeeSuccess.historyMotivation,
    data: params,
  });
  return res;
});
export {
  getDetailEmployeeSuccess,
  updateEmloyeeSuccess,
  deleteEmployeeSuccess,
  historyKof,
  historyRada,
  historyMotivation,
};
