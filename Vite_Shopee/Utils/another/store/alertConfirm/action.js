import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'alertConfirm';

const keyReducer = {
  get: `${key}/get`,
  updateColor: `${key}/updateColor`,
  clear: `${key}/clear`,
};

const getDashboardAlertConfirm = createAsyncThunk(keyReducer.get, async (data) => {
  const res = await callApi({
    method: 'postArray',
    url: API_APP.alertConfirm.get,
    data: { data },
  });
  return res;
});

const updateColorDashboardAlertConfirmation = createAsyncThunk(keyReducer.updateColor, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'postArray',
    url: API_APP.alertConfirm.updateColor,
    onSuccess,
    data: { data },
  });
  return res;
});

const clearDashboardAlertConfirm = createAction(keyReducer.clear);

export { getDashboardAlertConfirm, clearDashboardAlertConfirm, updateColorDashboardAlertConfirmation };
