import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'common';
const keyReducer = {
  dropdown: `${key}/getDropdown`,
  filterList: `${key}/filterList`,
  role: `${key}/role`,
  workflowAdmin: `${key}/workflowAdmin`,
};

const getDropdown = createAsyncThunk(keyReducer.dropdown, async (payload) => {
  const { type } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.common.dropdown,
    data: type,
  });
  return res;
});

const getMenuFilter = createAsyncThunk(keyReducer.filterList, async (payload) => {
  const { onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.common.filterList,
    onSuccess,
  });
  return res;
});

const getDropdownRole = createAsyncThunk(keyReducer.role, async () => {
  const res = await callApi({
    method: 'get',
    url: API_APP.common.role,
  });
  return res;
});

const getDropdownWorkflowADMIN = createAsyncThunk(keyReducer.workflowAdmin, async () => {
  const res = await callApi({
    method: 'get',
    url: API_APP.common.workFlowRole('ADMIN'),
  });
  return res;
});

export { getDropdown, getMenuFilter, getDropdownRole, getDropdownWorkflowADMIN };
