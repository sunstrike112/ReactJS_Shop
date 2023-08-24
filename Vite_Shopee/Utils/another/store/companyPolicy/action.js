import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'companyPolicy';

const keyReducer = {
  search: `${key}/search`,
  create: `${key}/create`,
  delete: `${key}/delete`,
  filter: `${key}/filter`,
  update: `${key}/update`,
  history: `${key}/history`,
};
const searchCompanyPolicy = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.companyPolicy.filter,
    data: params,
  });
  return res;
});

const historyCompanyPolicy = createAsyncThunk(keyReducer.history, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.companyPolicy.history,
    data: params,
  });
  return res;
});

const filterCompanyPolicy = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, onSuccess, onFinally } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.companyPolicy.filter,
    data: params,
    onSuccess,
    onFinally,
  });
  return res;
});

const createCompanyPolicy = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.companyPolicy.create,
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const deleteCompanyPolicy = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.companyPolicy.delete,
    data,
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateCompanyPolicy = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.companyPolicy.update,
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

export {
  searchCompanyPolicy,
  historyCompanyPolicy,
  filterCompanyPolicy,
  createCompanyPolicy,
  deleteCompanyPolicy,
  updateCompanyPolicy,
};
