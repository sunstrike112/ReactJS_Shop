import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'overtime';

const keyReducer = {
  import: `${key}/import`,
  get: `${key}/get`,
  create: `${key}/create`,
  update: `${key}/update`,
  history: `${key}/history`,
  clearImport: `${key}/clearImport`,
  clearSetting: `${key}/clearSetting`,
  clearYearOvertimeSetting: `${key}/clearYearOvertimeSetting`,
  getYearOvertimeSetting: `${key}/getYearOvertimeSetting`,
};

const importOvertime = createAsyncThunk(keyReducer.import, async (payload) => {
  const {
    files,
    fiscalYear,
    valueMonth,
    importTarget,
    checkDuplicate,
    onSuccess = () => {},
    onFailed = () => {},
  } = payload;
  const res = await callApi({
    method: 'postMultiFile',
    url: API_APP.overtime.importOvertime,
    onSuccess,
    data: { overtime: files.overtime, fiscalYear, valueMonth, importTarget, checkDuplicate },
    onFailed,
    textSuccess: 'IMPORT_SUCCESS',
  });
  return res;
});

const getHistoryOvertimeSetting = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.overtime.history,
    data: params,
  });
  return res;
});

const getOvertime = createAsyncThunk(keyReducer.get, async (payload) => {
  const { employeeId, fiscalYear } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.overtime.get(employeeId, fiscalYear),
  });
  return res;
});

const getYearOvertimeSetting = createAsyncThunk(keyReducer.getYearOvertimeSetting, async (payload) => {
  const { fiscalYear } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.overtime.getYearOvertimeSetting(fiscalYear),
  });
  return res;
});

const createOvertime = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.overtime.create,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateOvertime = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.overtime.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const clearConfirmOvertimeImport = createAction(keyReducer.clearImport);
const clearConfirmOvertimeSetting = createAction(keyReducer.clearSetting);
const clearYearOvertimeSetting = createAction(keyReducer.clearYearOvertimeSetting);

export {
  importOvertime,
  createOvertime,
  updateOvertime,
  getHistoryOvertimeSetting,
  getOvertime,
  clearConfirmOvertimeImport,
  clearConfirmOvertimeSetting,
  clearYearOvertimeSetting,
  getYearOvertimeSetting,
};
