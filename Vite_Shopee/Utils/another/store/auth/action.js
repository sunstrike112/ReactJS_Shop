import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const key = 'auth';

const keyReducer = {
  signIn: `${key}/signIn`,
  signOut: `${key}/signOut`,
  signUp: `${key}/signUp`,
  setUser: `${key}/setUser`,
  me: `${key}/me`,
  change_password: `${key}/changePassword`,
  forgot_password: `${key}/forgotPassword`,
  reset_password: `${key}/resetPassword`,
  signInSSO: `${key}/signInSSO`,
  signInSSORefresh: `${key}/signInSSORefresh`,
  detailPermission: `${key}/detailPermission`,
  reDetailPermission: `${key}/detailPermission/refresh`,
  reMe: `${key}/me/refresh`,
};
const signIn = createAsyncThunk(keyReducer.signIn, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.auth.login,
    data,
    onSuccess,
    textSuccess: 'LOGIN_SUCCESS',
  });
  return res;
});
const signUp = createAsyncThunk(keyReducer.signUp, async (payload) => {
  const { data, onSuccess } = payload;
  await callApi({
    method: 'post',
    url: API_APP.auth.register,
    data,
    onSuccess,
  });
});
const setUser = createAction(keyReducer.setUser);
const signOut = createAction(keyReducer.signOut);
const profileMe = createAsyncThunk(keyReducer.me, async (payload) => {
  const { onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.auth.me,
    onSuccess,
  });
  return res;
});

const changePassword = createAsyncThunk(keyReducer.change_password, async (payload, thunkAPI) => {
  const { data, onSuccess } = payload;
  await callApi(
    {
      method: 'put',
      url: API_APP.auth.change_password,
      data,
      onSuccess,
      textSuccess: 'CHANGE_PASSWORD_SUCCESS',
    },
    thunkAPI,
  );
});

const forgotPassword = createAsyncThunk(keyReducer.forgot_password, async (payload, thunkAPI) => {
  const { data, onSuccess } = payload;
  await callApi(
    {
      method: 'post',
      url: API_APP.auth.forgot_password,
      data,
      onSuccess,
      textSuccess: 'SEND_MAIL_SUCCESS',
    },
    thunkAPI,
  );
});

const resetPassword = createAsyncThunk(keyReducer.reset_password, async (payload, thunkAPI) => {
  const { data, onSuccess } = payload;
  await callApi(
    {
      method: 'put',
      url: API_APP.auth.reset_password,
      data,
      onSuccess,
      textSuccess: 'RESET_PASSWORD_SUCCESS',
    },
    thunkAPI,
  );
});

const signInSSO = createAsyncThunk(keyReducer.signInSSO, async (payload) => {
  const { data, onSuccess } = payload;
  const onFailed = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = '/login';
    }, 3000);
  };
  const res = await callApi({
    method: 'post',
    url: API_APP.auth.ssoAzure,
    data,
    onSuccess,
    textSuccess: 'LOGIN_SUCCESS',
    onFailed,
  });
  return res;
});

const signInSSORefresh = createAsyncThunk(keyReducer.signInSSORefresh, async (payload) => {
  const { data, onSuccess } = payload;
  const onFailed = () => {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = '/login';
    }, 3000);
  };
  const res = await callApi({
    method: 'post',
    url: API_APP.auth.ssoAzure,
    data,
    onSuccess,
    onFailed,
  });
  return res;
});

const getDetailPermission = createAsyncThunk(keyReducer.detailPermission, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.manageUser.role.detailPermission(data.id),
    onSuccess,
  });
  return res;
});
const getDetailPermissionRefresh = createAsyncThunk(keyReducer.reDetailPermission, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.manageUser.role.detailPermission(data.id),
    onSuccess,
  });
  return res;
});

const profileMeRefresh = createAsyncThunk(keyReducer.reMe, async (payload) => {
  const { onSuccess } = payload;
  const res = await callApi({
    method: 'get',
    url: API_APP.auth.me,
    onSuccess,
  });
  return res;
});

export {
  signIn,
  signOut,
  signUp,
  setUser,
  changePassword,
  profileMe,
  forgotPassword,
  resetPassword,
  signInSSO,
  signInSSORefresh,
  getDetailPermission,
  getDetailPermissionRefresh,
  profileMeRefresh,
};
