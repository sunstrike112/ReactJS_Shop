import { createSlice } from '@reduxjs/toolkit';
import {
  getPolicyProgress,
  getHistoryPolicyProgress,
  getHistoryPromotion,
  getHistoryTRisk,
  updatePolicyProgress,
  deletePolicyProgress,
  getTobeFY,
} from './action';

const initialState = {
  policyProgress: {
    employeeId: null,
    policyProgress: null,
    fiscalYear: 0,
    tobeFyFiscal: null,
    tobeFyFiscalPlus1: null,
    tobeFyFiscalPlus2: null,
    tobeFyFiscalPlus3: null,
    asis: null,
    riskSelection: null,
    riskDescription: null,
    assignDescription: null,
    version: 0,
  },
  historyPolicyProgress: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  historyTRisk: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  historyPromotion: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listPreferenceCodeMaster: { data: [] },
  loadingPolicyProgress: false,
};

const policyProgressSlice = createSlice({
  name: 'policyProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPolicyProgress.pending, (state) => ({
      ...state,
      loadingPolicyProgress: true,
      policyProgress: initialState.policyProgress,
    }));
    builder.addCase(getPolicyProgress.fulfilled, (state, { payload }) => ({
      ...state,
      loadingPolicyProgress: false,
      policyProgress: payload,
    }));
    builder.addCase(getPolicyProgress.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));

    builder.addCase(deletePolicyProgress.pending, (state) => ({ ...state, loadingPolicyProgress: true }));
    builder.addCase(deletePolicyProgress.fulfilled, (state) => ({
      ...state,
      loadingPolicyProgress: false,
    }));
    builder.addCase(deletePolicyProgress.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));

    builder.addCase(getHistoryPolicyProgress.pending, (state) => ({
      ...state,
      loadingPolicyProgress: true,
      historyPolicyProgress: initialState.historyPolicyProgress,
    }));
    builder.addCase(getHistoryPolicyProgress.fulfilled, (state, { payload }) => ({
      ...state,
      loadingPolicyProgress: false,
      historyPolicyProgress: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryPolicyProgress.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));

    builder.addCase(getHistoryTRisk.pending, (state) => ({
      ...state,
      loadingPolicyProgress: true,
      historyTRisk: initialState.historyTRisk,
    }));
    builder.addCase(getHistoryTRisk.fulfilled, (state, { payload }) => ({
      ...state,
      loadingPolicyProgress: false,
      historyTRisk: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryTRisk.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));

    builder.addCase(getHistoryPromotion.pending, (state) => ({
      ...state,
      loadingPolicyProgress: true,
      historyPromotion: initialState.historyPromotion,
    }));
    builder.addCase(getHistoryPromotion.fulfilled, (state, { payload }) => ({
      ...state,
      loadingPolicyProgress: false,
      historyPromotion: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryPromotion.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));

    builder.addCase(getTobeFY.pending, (state) => ({
      ...state,
      loadingPolicyProgress: true,
      listPreferenceCodeMaster: initialState.listPreferenceCodeMaster,
    }));
    builder.addCase(getTobeFY.fulfilled, (state, { payload }) => ({
      ...state,
      loadingPolicyProgress: false,
      listPreferenceCodeMaster: {
        data: payload.records,
      },
    }));
    builder.addCase(getTobeFY.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));

    builder.addCase(updatePolicyProgress.pending, (state) => ({ ...state, loadingPolicyProgress: true }));
    builder.addCase(updatePolicyProgress.fulfilled, (state) => ({ ...state, loadingPolicyProgress: false }));
    builder.addCase(updatePolicyProgress.rejected, (state) => ({ ...state, loadingPolicyProgress: false }));
  },
});

const action = policyProgressSlice.actions;

export { action };
export default policyProgressSlice.reducer;
