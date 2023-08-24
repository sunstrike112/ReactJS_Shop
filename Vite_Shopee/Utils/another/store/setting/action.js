import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const keyReducer = {
  invite_user: 'setting/inviteUser',
};

const inviteUser = createAsyncThunk(keyReducer.update, async (payload) => {
  const { data, onSuccess } = payload;
  const res = await callApi({
    method: 'post',
    url: API_APP.setting.invite_user,
    data,
    onSuccess,
    textSuccess: 'INVITE_SUCCESS',
    noVerifyPost: true,
  });
  return res;
});

export { inviteUser };
