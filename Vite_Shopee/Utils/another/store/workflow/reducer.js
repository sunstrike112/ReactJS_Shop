import { createSlice } from '@reduxjs/toolkit';
import {
  getImportProcessList,
  getListApproverAndAgent,
  getProcessListIncomplete,
  getProcessListCompleted,
  getHistoryProcess,
  getDetailProcess,
} from './action';

const initialState = {
  loadingWorkflow: false,
  listApproverAndAgent: [],
  listHistoryProcess: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listProcessIncomplete: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listProcessCompleted: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listImportProcess: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  detailProcess: {
    current: {},
    update: {},
  },
  waitingDetail: true,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getImportProcessList.pending, (state) => ({ ...state, loadingWorkflow: true }));
    builder.addCase(getImportProcessList.fulfilled, (state, { payload }) => ({
      ...state,
      listImportProcess: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
      loadingWorkflow: false,
    }));
    builder.addCase(getImportProcessList.rejected, (state) => ({ ...state, loadingWorkflow: false }));

    builder.addCase(getProcessListIncomplete.pending, (state) => ({ ...state, loadingWorkflow: true }));
    builder.addCase(getProcessListIncomplete.fulfilled, (state, { payload }) => ({
      ...state,
      listProcessIncomplete: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
      loadingWorkflow: false,
    }));
    builder.addCase(getProcessListIncomplete.rejected, (state) => ({ ...state, loadingWorkflow: false }));

    builder.addCase(getProcessListCompleted.pending, (state) => ({ ...state, loadingWorkflow: true }));
    builder.addCase(getProcessListCompleted.fulfilled, (state, { payload }) => ({
      ...state,
      listProcessCompleted: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
      loadingWorkflow: false,
    }));
    builder.addCase(getProcessListCompleted.rejected, (state) => ({ ...state, loadingWorkflow: false }));

    builder.addCase(getHistoryProcess.pending, (state) => ({ ...state, loadingWorkflow: true }));
    builder.addCase(getHistoryProcess.fulfilled, (state, { payload }) => ({
      ...state,
      listHistoryProcess: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
      loadingWorkflow: false,
    }));
    builder.addCase(getHistoryProcess.rejected, (state) => ({ ...state, loadingWorkflow: false }));

    builder.addCase(getDetailProcess.pending, (state) => ({
      ...state,
      loadingWorkflow: true,
      detailProcess: state.detailProcess,
      waitingDetail: true,
    }));
    builder.addCase(getDetailProcess.fulfilled, (state, { payload }) => ({
      ...state,
      detailProcess: {
        current: payload.current,
        update: payload.update,
      },
      loadingWorkflow: false,
      waitingDetail: false,
    }));
    builder.addCase(getDetailProcess.rejected, (state) => ({ ...state, loadingWorkflow: false, waitingDetail: false }));

    builder.addCase(getListApproverAndAgent.pending, (state) => ({ ...state, loadingWorkflow: true }));
    builder.addCase(getListApproverAndAgent.fulfilled, (state, { payload }) => ({
      ...state,
      listApproverAndAgent: payload,
      loadingWorkflow: false,
    }));
    builder.addCase(getListApproverAndAgent.rejected, (state) => ({ ...state, loadingWorkflow: false }));
  },
});
const action = workflowSlice.actions;

export { action };
export default workflowSlice.reducer;
