import { createSlice } from '@reduxjs/toolkit';
import { getEsMngPred, getHistoryOVerviewInfo, getOverviewInfo, updateOverviewInfo } from './action';

const initialState = {
  overviewInfo: {
    actionRequired: 0,
    childcareMaternityLeave: 0,
    comprehension: 0,
    deleteFlg: 0,
    employeeId: '',
    esManager: '',
    esManagerName: null,
    leaveOff: 0,
    notInOperation: 0,
    overtimeFlag: 0,
    picPerson: null,
    pinasaFlag: 0,
    predecessor: '',
    predecessorName: null,
    relationship: 0,
    status: '',
    whatToDo: '',
    whenEnd: null,
    version: 0,
  },
  historyOverviewInfo: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listEsMngPred: { data: [] },
  loadingOverviewInfo: false,
  loadingListEsManger: false,
  loadingListEsMangerDashboard: false,
};

const overviewInfoSlice = createSlice({
  name: 'overviewInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOverviewInfo.pending, (state) => ({
      ...state,
      loadingOverviewInfo: true,
      overviewInfo: initialState.overviewInfo,
    }));
    builder.addCase(getOverviewInfo.fulfilled, (state, { payload }) => ({
      ...state,
      loadingOverviewInfo: false,
      overviewInfo: payload,
    }));
    builder.addCase(getOverviewInfo.rejected, (state) => ({ ...state, loadingOverviewInfo: false }));

    builder.addCase(getHistoryOVerviewInfo.pending, (state) => ({
      ...state,
      loadingOverviewInfo: true,
      historyOverviewInfo: initialState.historyOverviewInfo,
    }));
    builder.addCase(getHistoryOVerviewInfo.fulfilled, (state, { payload }) => ({
      ...state,
      loadingOverviewInfo: false,
      historyOverviewInfo: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(getHistoryOVerviewInfo.rejected, (state) => ({ ...state, loadingOverviewInfo: false }));

    builder.addCase(getEsMngPred.pending, (state) => ({
      ...state,
      loadingListEsManger: true,
      loadingListEsMangerDashboard: true,
      listEsMngPred: initialState.listEsMngPred,
    }));
    builder.addCase(getEsMngPred.fulfilled, (state, { payload }) => ({
      ...state,
      loadingListEsManger: false,
      loadingListEsMangerDashboard: false,
      listEsMngPred: {
        data: payload.records,
      },
    }));
    builder.addCase(getEsMngPred.rejected, (state) => ({
      ...state,
      loadingListEsManger: false,
      loadingListEsMangerDashboard: false,
    }));

    builder.addCase(updateOverviewInfo.pending, (state) => ({ ...state, loadingOverviewInfo: true }));
    builder.addCase(updateOverviewInfo.fulfilled, (state) => ({ ...state, loadingOverviewInfo: false }));
    builder.addCase(updateOverviewInfo.rejected, (state) => ({ ...state, loadingOverviewInfo: false }));
  },
});

const action = overviewInfoSlice.actions;

export { action };
export default overviewInfoSlice.reducer;
