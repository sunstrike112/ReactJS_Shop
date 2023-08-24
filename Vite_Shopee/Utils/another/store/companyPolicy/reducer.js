import { createSlice } from '@reduxjs/toolkit';
import {
  filterCompanyPolicy,
  historyCompanyPolicy,
  searchCompanyPolicy,
  createCompanyPolicy,
  deleteCompanyPolicy,
  updateCompanyPolicy,
} from './action';

const initialState = {
  companyPolicy: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  histCompanyPolicy: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  companyPolicyFilter: {
    data: [],
  },
  companyPolicyDetail: {},
  errorSub: null,
  loadingCompanyPolicy: false,
};

const companyPolicySlice = createSlice({
  name: 'companyPolicy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchCompanyPolicy.pending, (state) => ({
      ...state,
      loadingCompanyPolicy: true,
      companyPolicy: initialState.companyPolicy,
    }));
    builder.addCase(searchCompanyPolicy.fulfilled, (state, { payload }) => ({
      ...state,
      loadingCompanyPolicy: false,
      companyPolicy: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(searchCompanyPolicy.rejected, (state) => ({ ...state, loadingCompanyPolicy: false }));

    builder.addCase(historyCompanyPolicy.pending, (state) => ({
      ...state,
      loadingCompanyPolicy: true,

      histCompanyPolicy: initialState.companyPolicy,
    }));
    builder.addCase(historyCompanyPolicy.fulfilled, (state, { payload }) => ({
      ...state,
      loadingCompanyPolicy: false,
      histCompanyPolicy: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(historyCompanyPolicy.rejected, (state) => ({ ...state, loadingCompanyPolicy: false }));

    builder.addCase(filterCompanyPolicy.pending, (state) => ({ ...state }));
    builder.addCase(filterCompanyPolicy.fulfilled, (state) => ({
      ...state,
    }));
    builder.addCase(filterCompanyPolicy.rejected, (state) => ({ ...state }));

    builder.addCase(createCompanyPolicy.pending, (state) => ({ ...state, loadingCompanyPolicy: true }));
    builder.addCase(createCompanyPolicy.fulfilled, (state) => ({ ...state, loadingCompanyPolicy: false }));
    builder.addCase(createCompanyPolicy.rejected, (state) => ({ ...state, loadingCompanyPolicy: false }));

    builder.addCase(deleteCompanyPolicy.pending, (state) => ({ ...state, loadingCompanyPolicy: true }));
    builder.addCase(deleteCompanyPolicy.fulfilled, (state) => ({ ...state, loadingCompanyPolicy: false }));
    builder.addCase(deleteCompanyPolicy.rejected, (state) => ({ ...state, loadingCompanyPolicy: false }));

    builder.addCase(updateCompanyPolicy.pending, (state) => ({ ...state, loadingCompanyPolicy: true }));
    builder.addCase(updateCompanyPolicy.fulfilled, (state) => ({ ...state, loadingCompanyPolicy: false }));
    builder.addCase(updateCompanyPolicy.rejected, (state) => ({ ...state, loadingCompanyPolicy: false }));
  },
});

const action = companyPolicySlice.actions;

export { action };
export default companyPolicySlice.reducer;
