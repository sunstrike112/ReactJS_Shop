import { createSlice } from '@reduxjs/toolkit';
import {
  clearConfirmOvertimeImport,
  clearConfirmOvertimeSetting,
  clearYearOvertimeSetting,
  createOvertime,
  getHistoryOvertimeSetting,
  getOvertime,
  getYearOvertimeSetting,
  importOvertime,
  updateOvertime,
} from './action';

const initialState = {
  loadingOvertime: false,
  yearOvertimeSetting: {
    year: null,
    monthlyOtLimit: null,
    code: null,
  },
  overTimeData: {
    year: null,
    months: {
      april: true,
      may: true,
      june: true,
      july: true,
      aug: true,
      sept: true,
      oct: true,
      nov: true,
      dec: true,
      jan: true,
      feb: true,
      mar: true,
    },
  },
  confirmOvertime: {
    code: null,
    message: null,
  },
  confirmOvertimeSetting: {
    type: null,
    message: null,
  },
  historyOvertimeSetting: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
};

const overtimeSlice = createSlice({
  name: 'overtime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearConfirmOvertimeImport, (state) => ({
      ...state,
      confirmOvertime: {
        code: null,
        message: null,
      },
    }));
    builder.addCase(clearConfirmOvertimeSetting, (state) => ({
      ...state,
      confirmOvertimeSetting: {
        code: null,
        message: null,
      },
    }));
    builder.addCase(clearYearOvertimeSetting, (state) => ({
      ...state,
      yearOvertimeSetting: {
        year: null,
        monthlyOtLimit: null,
        code: null,
      },
    }));

    builder.addCase(importOvertime.pending, (state) => ({ ...state, loadingOvertime: true }));
    builder.addCase(importOvertime.fulfilled, (state, { payload }) => ({
      ...state,
      confirmOvertime: {
        code: payload.code,
        message: payload.message,
      },
      loadingOvertime: false,
    }));
    builder.addCase(importOvertime.rejected, (state) => ({ ...state, loadingOvertime: false }));

    builder.addCase(createOvertime.pending, (state) => ({ ...state, loadingOvertime: true }));
    builder.addCase(createOvertime.fulfilled, (state, { payload }) => ({
      ...state,
      confirmOvertimeSetting: {
        type: payload.type,
        message: payload.message,
        version: payload.version,
      },
      loadingOvertime: false,
    }));
    builder.addCase(createOvertime.rejected, (state) => ({ ...state, loadingOvertime: false }));

    builder.addCase(updateOvertime.pending, (state) => ({ ...state, loadingOvertime: true }));
    builder.addCase(updateOvertime.fulfilled, (state) => ({ ...state, loadingOvertime: false }));
    builder.addCase(updateOvertime.rejected, (state) => ({ ...state, loadingOvertime: false }));

    builder.addCase(getOvertime.pending, (state) => ({ ...state }));
    builder.addCase(getOvertime.fulfilled, (state, { payload }) => ({
      ...state,
      overTimeData: {
        year: payload.year || initialState.overTimeData.year,
        months: payload.months || initialState.overTimeData.months,
      },
    }));
    builder.addCase(getOvertime.rejected, (state) => ({ ...state }));

    builder.addCase(getYearOvertimeSetting.pending, (state) => ({ ...state, loadingOvertime: true }));
    builder.addCase(getYearOvertimeSetting.fulfilled, (state, { payload }) => ({
      ...state,
      yearOvertimeSetting: {
        year: payload.year || initialState.yearOvertimeSetting.year,
        monthlyOtLimit: payload.monthlyOtLimit,
        code: payload.code || initialState.yearOvertimeSetting.code,
      },
      loadingOvertime: false,
    }));
    builder.addCase(getYearOvertimeSetting.rejected, (state) => ({ ...state, loadingOvertime: false }));

    builder.addCase(getHistoryOvertimeSetting.pending, (state) => ({
      ...state,
      loadingOvertime: true,
      historyOververtimeSetting: initialState.historyOvertimeSetting,
    }));
    builder.addCase(getHistoryOvertimeSetting.fulfilled, (state, { payload }) => ({
      ...state,
      loadingOvertime: false,
      historyOvertimeSetting: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryOvertimeSetting.rejected, (state) => ({ ...state, loadingOvertime: false }));
  },
});
const action = overtimeSlice.actions;

export { action };
export default overtimeSlice.reducer;
