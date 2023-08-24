import { createSlice } from '@reduxjs/toolkit';
import { getSummaryStaff, updateSumamryStaff, updateSubSummaryStaff } from './action';

const initialState = {
  staffSummary: {
    data: {},
    dataSub: {},
  },
  loadingSummary: false,
  isValidUser: true,
  loadingValidUser: true,
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSummaryStaff.pending, (state) => ({
      ...state,
      loadingSummary: true,
      isValidUser: true,
      loadingValidUser: true,
    }));
    builder.addCase(getSummaryStaff.fulfilled, (state, { payload }) => ({
      ...state,
      loadingSummary: false,
      isValidUser: true,
      loadingValidUser: false,
      staffSummary: {
        data: payload.basicInfoDto || {},
        dataSub: payload.basicInfoSubDto || {},
      },
    }));
    builder.addCase(getSummaryStaff.rejected, (state) => ({
      ...state,
      loadingSummary: false,
      isValidUser: false,
      loadingValidUser: false,
    }));
    builder.addCase(updateSumamryStaff, (state, { payload }) => ({
      ...state,
      staffSummary: {
        ...state.staffSummary,
        data: payload || {},
      },
    }));
    builder.addCase(updateSubSummaryStaff, (state, { payload }) => ({
      ...state,
      staffSummary: {
        ...state.staffSummary,
        dataSub: payload || {},
      },
    }));
  },
});
const action = summarySlice.actions;

export { action };
export default summarySlice.reducer;
