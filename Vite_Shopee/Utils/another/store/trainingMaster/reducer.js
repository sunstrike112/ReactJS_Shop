import { createSlice } from '@reduxjs/toolkit';
import {
  searchTrainingMaster,
  historyTrainingMaster,
  filterTrainingMaster,
  deleteTrainingMaster,
  updateTrainingMaster,
  createTrainingMaster,
} from './action';

const initialState = {
  trainingMaster: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  histTrainingMaster: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  trainingMasterFilter: {
    data: [],
  },
  trainingMasterDetail: {},
  errorSub: null,
  loadingTrainingMaster: false,
};

const trainingMasterSlice = createSlice({
  name: 'trainingMaster',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchTrainingMaster.pending, (state) => ({
      ...state,
      loadingTrainingMaster: true,
      trainingMaster: initialState.trainingMaster,
    }));
    builder.addCase(searchTrainingMaster.fulfilled, (state, { payload }) => ({
      ...state,
      loadingTrainingMaster: false,
      trainingMaster: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(searchTrainingMaster.rejected, (state) => ({ ...state, loadingTrainingMaster: false }));

    builder.addCase(historyTrainingMaster.pending, (state) => ({
      ...state,
      loadingTrainingMaster: true,
      histTrainingMaster: initialState.histTrainingMaster,
    }));
    builder.addCase(historyTrainingMaster.fulfilled, (state, { payload }) => ({
      ...state,
      loadingTrainingMaster: false,
      histTrainingMaster: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(historyTrainingMaster.rejected, (state) => ({ ...state, loadingTrainingMaster: false }));

    builder.addCase(filterTrainingMaster.pending, (state) => ({ ...state }));
    builder.addCase(filterTrainingMaster.fulfilled, (state) => ({
      ...state,
    }));
    builder.addCase(filterTrainingMaster.rejected, (state) => ({ ...state, loadingTrainingMaster: false }));

    builder.addCase(deleteTrainingMaster.pending, (state) => ({ ...state, loadingTrainingMaster: true }));
    builder.addCase(deleteTrainingMaster.fulfilled, (state) => ({ ...state, loadingTrainingMaster: false }));
    builder.addCase(deleteTrainingMaster.rejected, (state) => ({ ...state, loadingTrainingMaster: false }));

    builder.addCase(updateTrainingMaster.pending, (state) => ({ ...state, loadingTrainingMaster: true }));
    builder.addCase(updateTrainingMaster.fulfilled, (state) => ({ ...state, loadingTrainingMaster: false }));
    builder.addCase(updateTrainingMaster.rejected, (state) => ({ ...state, loadingTrainingMaster: false }));

    builder.addCase(createTrainingMaster.pending, (state) => ({ ...state, loadingTrainingMaster: true }));
    builder.addCase(createTrainingMaster.fulfilled, (state) => ({ ...state, loadingTrainingMaster: false }));
    builder.addCase(createTrainingMaster.rejected, (state) => ({ ...state, loadingTrainingMaster: false }));
  },
});

const action = trainingMasterSlice.actions;

export { action };
export default trainingMasterSlice.reducer;
