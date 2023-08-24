import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'basicInfo';

const keyReducer = {
  search: `${key}/search`,
  create: `${key}/create`,
  delete: `${key}/delete`,
  filter: `${key}/filter`,
  update: `${key}/update`,
  searchSub: `${key}/searchSub`,
  createSub: `${key}/createSub`,
  deleteSub: `${key}/deleteSub`,
  filterSub: `${key}/filterSub`,
  updateSub: `${key}/updateSub`,
  detailBasicInfoSub: `${key}/detailBasicInfoSub`,
  historyBasicInfoDetail: `${key}/historyBasicInfoDetail`,
  histotyBasicInfoSub: `${key}/histotyBasicInfoSub`,
};
const searchBasicInfo = createAsyncThunk(keyReducer.search, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.basicInfo.listNew,
    data: params,
  });
  return res;
});

const historyBasicInfoDetail = createAsyncThunk(keyReducer.historyBasicInfoDetail, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.basicInfo.filter,
    data: params,
  });
  return res;
});
const histotyBasicInfoSub = createAsyncThunk(keyReducer.histotyBasicInfoSub, async (payload) => {
  const { params } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.basicInfo.filterSub,
    data: params,
  });
  return res;
});

const filterBasicInfo = createAsyncThunk(keyReducer.filter, async (payload) => {
  const { params, keySearch } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.basicInfo.filter,
    data: params,
    keySearch,
  });
  return res;
});

const createBasicInfo = createAsyncThunk(keyReducer.create, async (payload) => {
  const { data, onSuccess, id } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.basicInfo.create(id),
    data,
    onSuccess,
    textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const deleteBasicInfo = createAsyncThunk(keyReducer.delete, async (payload) => {
  const { data, onSuccess, paramsWF } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.basicInfo.delete(data),
    data: paramsWF,
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

const updateBasicInfo = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess, id } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.basicInfo.update(id),
    data,
    textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const createBasicInfoSub = createAsyncThunk(keyReducer.createSub, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.basicInfo.createSub,
    data,
    onSuccess,
    // textSuccess: 'CREATED_SUCCESS',
  });
  return res;
});

const updateBasicInfoSub = createAsyncThunk(keyReducer.updateSub, async (payload) => {
  const { data, onSuccess, id } = payload;
  const res = await callApi({
    method: 'put',
    url: API_APP.basicInfo.updateSub(id),
    data,
    // textSuccess: 'UPDATED_SUCCESS',
    onSuccess,
  });
  return res;
});

const detailBasicInfoSub = createAsyncThunk(keyReducer.detailBasicInfoSub, async (payload) => {
  const { id, onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.basicInfo.detailBasicInfoSub(id),
    onSuccess,
  });
  return res;
});

const deleteBasicInfoSub = createAsyncThunk(keyReducer.deleteSub, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'delete',
    url: API_APP.basicInfo.deleteSub,
    data,
    textSuccess: 'DELETED_SUCCESS',
    onSuccess,
  });
  return res;
});

export {
  searchBasicInfo,
  filterBasicInfo,
  createBasicInfo,
  deleteBasicInfo,
  updateBasicInfo,
  createBasicInfoSub,
  updateBasicInfoSub,
  detailBasicInfoSub,
  deleteBasicInfoSub,
  historyBasicInfoDetail,
  histotyBasicInfoSub,
};
