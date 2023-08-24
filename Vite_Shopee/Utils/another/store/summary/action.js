import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const keyReducer = {
  getStaff: 'summary/getStaff',
  updateSummary: 'summary/updateSummary',
  updateSubSummary: 'summary/updateSubSummary',
};

const getSummaryStaff = createAsyncThunk(keyReducer.getStaff, async (payload) => {
  const { id, onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.summary.getProfile(id),
    onSuccess,
  });
  return res;
});

const updateSumamryStaff = createAction(keyReducer.updateSummary);
const updateSubSummaryStaff = createAction(keyReducer.updateSubSummary);

export { getSummaryStaff, updateSumamryStaff, updateSubSummaryStaff };
