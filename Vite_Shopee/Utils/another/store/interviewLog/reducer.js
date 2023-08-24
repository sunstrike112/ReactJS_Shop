import { createSlice } from '@reduxjs/toolkit';
import {
  getInterviewLog,
  getHistoryInterviewLog,
  createInterviewLog,
  updateInterviewLog,
  getEsMngPred,
} from './action';

const initialState = {
  interviewLog: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  historyInterviewLog: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listEsMngPred: { data: [] },
  loadingInterviewLog: false,
};

const interviewLogSlice = createSlice({
  name: 'interviewLog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInterviewLog.pending, (state) => ({
      ...state,
      loadingInterviewLog: true,
      interviewLog: initialState.interviewLog,
    }));
    builder.addCase(getInterviewLog.fulfilled, (state, { payload }) => ({
      ...state,
      loadingInterviewLog: false,
      interviewLog: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getInterviewLog.rejected, (state) => ({ ...state, loadingInterviewLog: false }));

    builder.addCase(getHistoryInterviewLog.pending, (state) => ({
      ...state,
      loadingInterviewLog: true,
      historyInterviewLog: initialState.historyInterviewLog,
    }));
    builder.addCase(getHistoryInterviewLog.fulfilled, (state, { payload }) => ({
      ...state,
      loadingInterviewLog: false,
      historyInterviewLog: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryInterviewLog.rejected, (state) => ({ ...state, loadingInterviewLog: false }));

    builder.addCase(createInterviewLog.pending, (state) => ({ ...state, loadingInterviewLog: true }));
    builder.addCase(createInterviewLog.fulfilled, (state) => ({ ...state, loadingInterviewLog: false }));
    builder.addCase(createInterviewLog.rejected, (state) => ({ ...state, loadingInterviewLog: false }));

    builder.addCase(updateInterviewLog.pending, (state) => ({ ...state, loadingInterviewLog: true }));
    builder.addCase(updateInterviewLog.fulfilled, (state) => ({ ...state, loadingInterviewLog: false }));
    builder.addCase(updateInterviewLog.rejected, (state) => ({ ...state, loadingInterviewLog: false }));

    builder.addCase(getEsMngPred.pending, (state) => ({
      ...state,
      loadingListEsManger: true,
      listEsMngPred: initialState.listEsMngPred,
    }));
    builder.addCase(getEsMngPred.fulfilled, (state, { payload }) => ({
      ...state,
      loadingListEsManger: false,
      listEsMngPred: {
        data: payload.records,
      },
    }));
    builder.addCase(getEsMngPred.rejected, (state) => ({
      ...state,
      loadingListEsManger: false,
    }));
  },
});

const action = interviewLogSlice.actions;

export { action };
export default interviewLogSlice.reducer;
