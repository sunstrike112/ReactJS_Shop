import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_APP } from 'dhm/apis/index';
import { callApi } from 'dhm/services/auth/apis';

const keyReducer = {
  import: 'import/all',
};

const importAll = createAsyncThunk(keyReducer.import, async (payload) => {
  const { files, onSuccess = () => {}, onFailed = () => {} } = payload;
  const res = await callApi({
    method: 'postMultiFile',
    url: API_APP.import.importFile,
    onSuccess,
    data: files,
    onFailed,
    textSuccess: 'IMPORT_SUCCESS',
  });
  return res;
});

export { importAll };
