import { createSlice } from '@reduxjs/toolkit';
import {
  createProjectInfo,
  getHistoryProjectInfo,
  getProjectInfo,
  updateProjectInfo,
  clearConfirmProjectInfo,
} from './action';

const initialState = {
  projectInfo: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  confirmProjectInfo: {
    type: null,
    message: null,
    version: null,
  },
  historyProjectInfo: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  loadingProjectInfo: false,
};

const projectInfoSlice = createSlice({
  name: 'projectInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearConfirmProjectInfo, (state) => ({
      ...state,
      confirmProjectInfo: {
        type: null,
        message: null,
        version: null,
      },
    }));
    builder.addCase(getProjectInfo.pending, (state) => ({
      ...state,
      loadingProjectInfo: true,
      projectInfo: initialState.projectInfo,
    }));
    builder.addCase(getProjectInfo.fulfilled, (state, { payload }) => ({
      ...state,
      loadingProjectInfo: false,
      projectInfo: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getProjectInfo.rejected, (state) => ({ ...state, loadingProjectInfo: false }));

    builder.addCase(getHistoryProjectInfo.pending, (state) => ({
      ...state,
      loadingProjectInfo: true,
      historyProjectInfo: initialState.historyProjectInfo,
    }));
    builder.addCase(getHistoryProjectInfo.fulfilled, (state, { payload }) => ({
      ...state,
      loadingProjectInfo: false,
      historyProjectInfo: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryProjectInfo.rejected, (state) => ({ ...state, loadingProjectInfo: false }));

    builder.addCase(createProjectInfo.pending, (state) => ({ ...state, loadingProjectInfo: true }));
    builder.addCase(createProjectInfo.fulfilled, (state, { payload }) => ({
      ...state,
      confirmProjectInfo: {
        type: payload.type,
        message: payload.message,
        version: payload.version,
      },
      loadingProjectInfo: false,
    }));
    builder.addCase(createProjectInfo.rejected, (state) => ({ ...state, loadingProjectInfo: false }));

    builder.addCase(updateProjectInfo.pending, (state) => ({ ...state, loadingProjectInfo: true }));
    builder.addCase(updateProjectInfo.fulfilled, (state) => ({ ...state, loadingProjectInfo: false }));
    builder.addCase(updateProjectInfo.rejected, (state) => ({ ...state, loadingProjectInfo: false }));
  },
});

const action = projectInfoSlice.actions;

export { action };
export default projectInfoSlice.reducer;
