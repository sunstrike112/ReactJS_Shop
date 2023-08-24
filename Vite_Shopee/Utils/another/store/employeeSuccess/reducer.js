import { createSlice } from '@reduxjs/toolkit';
import {
  getDetailEmployeeSuccess,
  updateEmloyeeSuccess,
  deleteEmployeeSuccess,
  historyKof,
  historyRada,
  historyMotivation,
} from './action';

const initialState = {
  loadingEmployeeSuccess: false,
  detailEmployeeSuccess: {},
  historyRada: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  historyKof: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  historyMotivation: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
};

const employeeSuccessSlice = createSlice({
  name: 'employeeSuccess',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getDetailEmployeeSuccess.pending, (state) => ({
      ...state,
      loadingEmployeeSuccess: true,
      detailEmployeeSuccess: {},
    }));
    addCase(getDetailEmployeeSuccess.fulfilled, (state, { payload }) => ({
      ...state,
      loadingEmployeeSuccess: false,
      detailEmployeeSuccess: payload || {},
    }));
    addCase(getDetailEmployeeSuccess.rejected, (state) => ({ ...state, loadingEmployeeSuccess: false }));
    addCase(updateEmloyeeSuccess.pending, (state) => ({ ...state, loadingEmployeeSuccess: true }));
    addCase(updateEmloyeeSuccess.fulfilled, (state) => ({ ...state, loadingEmployeeSuccess: false }));
    addCase(updateEmloyeeSuccess.rejected, (state) => ({ ...state, loadingEmployeeSuccess: false }));
    addCase(deleteEmployeeSuccess.pending, (state) => ({ ...state, loadingEmployeeSuccess: true }));
    addCase(deleteEmployeeSuccess.fulfilled, (state) => ({
      ...state,
      loadingEmployeeSuccess: false,
      detailEmployeeSuccess: {},
    }));
    addCase(deleteEmployeeSuccess.rejected, (state) => ({ ...state, loadingEmployeeSuccess: false }));
    addCase(historyRada.pending, (state) => ({ ...state, loadingEmployeeSuccess: true }));
    addCase(historyRada.fulfilled, (state, { payload }) => ({
      ...state,
      loadingEmployeeSuccess: false,
      historyRada: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyRada.rejected, (state) => ({ ...state, loadingEmployeeSuccess: false }));
    addCase(historyMotivation.pending, (state) => ({ ...state, loadingEmployeeSuccess: true }));
    addCase(historyMotivation.fulfilled, (state, { payload }) => ({
      ...state,
      loadingEmployeeSuccess: false,
      historyMotivation: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyMotivation.rejected, (state) => ({ ...state, loadingEmployeeSuccess: false }));
    addCase(historyKof.pending, (state) => ({ ...state, loadingEmployeeSuccess: true }));
    addCase(historyKof.fulfilled, (state, { payload }) => ({
      ...state,
      loadingEmployeeSuccess: false,
      historyKof: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyKof.rejected, (state) => ({ ...state, loadingEmployeeSuccess: false }));
  },
});
const action = employeeSuccessSlice.actions;

export { action };
export default employeeSuccessSlice.reducer;
