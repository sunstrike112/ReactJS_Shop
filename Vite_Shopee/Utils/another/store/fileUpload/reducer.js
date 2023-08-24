import { createSlice } from '@reduxjs/toolkit';
import {
  getListAllFile,
  uploadFileByEmployeeId,
  getListEmployeeId,
  getAllFileVersion,
  deleteFile,
  getPublicAccessUrlFile,
} from './action';

const initialState = {
  listEmployeeId: [],
  listAllFile: [],
  loadingFileUpload: false,
  loadingListEmployeeId: false,
  listFileVersion: [],
  urlFile: '',
};

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListAllFile.pending, (state) => ({
      ...state,
      loadingFileUpload: true,
    }));
    builder.addCase(getListAllFile.fulfilled, (state, { payload }) => ({
      ...state,
      loadingFileUpload: false,
      listAllFile: payload,
    }));
    builder.addCase(getListAllFile.rejected, (state) => ({ ...state, loadingFileUpload: false }));

    builder.addCase(getListEmployeeId.pending, (state) => ({
      ...state,
      loadingListEmployeeId: true,
      listEmployeeId: initialState.listEmployeeId,
    }));
    builder.addCase(getListEmployeeId.fulfilled, (state, { payload }) => ({
      ...state,
      loadingListEmployeeId: false,
      listEmployeeId: payload,
    }));
    builder.addCase(getListEmployeeId.rejected, (state) => ({
      ...state,
      loadingListEmployeeId: false,
    }));

    builder.addCase(getAllFileVersion.pending, (state) => ({
      ...state,
      loadingFileUpload: true,
      listFileVersion: initialState.listFileVersion,
    }));
    builder.addCase(getAllFileVersion.fulfilled, (state, { payload }) => ({
      ...state,
      loadingFileUpload: false,
      listFileVersion: payload,
    }));
    builder.addCase(getAllFileVersion.rejected, (state) => ({
      ...state,
      loadingFileUpload: false,
    }));

    builder.addCase(getPublicAccessUrlFile.pending, (state) => ({
      ...state,
      loadingFileUpload: true,
      urlFile: initialState.urlFile,
    }));
    builder.addCase(getPublicAccessUrlFile.fulfilled, (state, { payload }) => ({
      ...state,
      loadingFileUpload: false,
      urlFile: payload?.url,
    }));
    builder.addCase(getPublicAccessUrlFile.rejected, (state) => ({
      ...state,
      loadingFileUpload: false,
    }));

    builder.addCase(uploadFileByEmployeeId.pending, (state) => ({ ...state, loadingFileUpload: true }));
    builder.addCase(uploadFileByEmployeeId.fulfilled, (state) => ({ ...state, loadingFileUpload: false }));
    builder.addCase(uploadFileByEmployeeId.rejected, (state) => ({ ...state, loadingFileUpload: false }));

    builder.addCase(deleteFile.pending, (state) => ({ ...state, loadingFileUpload: true }));
    builder.addCase(deleteFile.fulfilled, (state) => ({ ...state, loadingFileUpload: false }));
    builder.addCase(deleteFile.rejected, (state) => ({ ...state, loadingFileUpload: false }));
  },
});

const action = fileUploadSlice.actions;

export { action };
export default fileUploadSlice.reducer;
