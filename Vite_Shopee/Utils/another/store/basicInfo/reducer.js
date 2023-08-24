import { createSlice } from '@reduxjs/toolkit';
import {
  searchBasicInfo,
  filterBasicInfo,
  createBasicInfo,
  deleteBasicInfo,
  updateBasicInfo,
  createBasicInfoSub,
  updateBasicInfoSub,
  detailBasicInfoSub,
  deleteBasicInfoSub,
  historyBasicInfoDetail,
  histotyBasicInfoSub,
} from './action';

const initialState = {
  basicInfo: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  historyBasicInfoDetail: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  histotyBasicInfoSub: {
    data: [],
    pagination: {
      limit: 20,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  basicInfoFilter: {
    data: [],
  },
  basicInfoSubDetail: {},
  loadingBasicInfoSub: false,
  errorSub: null,
  loadingBasicInfo: false,
  loadingFilterBasicInfo: false,
};

const basicInfoSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchBasicInfo.pending, (state) => ({ ...state, loadingBasicInfo: true }));
    builder.addCase(searchBasicInfo.fulfilled, (state, { payload }) => ({
      ...state,
      loadingBasicInfo: false,
      basicInfo: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(searchBasicInfo.rejected, (state) => ({ ...state, loadingBasicInfo: false }));
    builder.addCase(filterBasicInfo.pending, (state) => ({ ...state, loadingFilterBasicInfo: true }));
    builder.addCase(filterBasicInfo.fulfilled, (state, { payload, meta: { arg } }) => ({
      ...state,
      loadingFilterBasicInfo: false,
      basicInfoFilter: {
        data: payload.records.map((item) => ({
          value: item[arg.keySearch],
          label: item[arg.keySearch],
          isChecked: true,
        })),
      },
    }));
    builder.addCase(filterBasicInfo.rejected, (state) => ({ ...state, loadingFilterBasicInfo: false }));
    builder.addCase(detailBasicInfoSub.pending, (state) => ({
      ...state,
      basicInfoSubDetail: {},
      loadingBasicInfoSub: true,
      errorSub: null,
    }));
    builder.addCase(detailBasicInfoSub.fulfilled, (state, { payload }) => ({
      ...state,
      basicInfoSubDetail: payload,
      loadingBasicInfoSub: false,
    }));
    builder.addCase(detailBasicInfoSub.rejected, (state) => ({
      ...state,
      loadingBasicInfoSub: false,
      errorSub: 'Error',
    }));
    builder.addCase(deleteBasicInfoSub.pending, (state) => ({ ...state }));
    builder.addCase(deleteBasicInfoSub.fulfilled, (state) => ({ ...state }));
    builder.addCase(deleteBasicInfoSub.rejected, (state) => ({ ...state }));
    builder.addCase(historyBasicInfoDetail.pending, (state) => ({
      ...state,
      loadingBasicInfo: true,
      historyBasicInfoDetail: {
        data: [],
        pagination: {
          limit: 20,
          page: 1,
          total: 0,
          totalPage: 0,
        },
      },
    }));
    builder.addCase(historyBasicInfoDetail.fulfilled, (state, { payload }) => ({
      ...state,
      loadingBasicInfo: false,
      historyBasicInfoDetail: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(historyBasicInfoDetail.rejected, (state) => ({
      loadingBasicInfo: false,
      historyBasicInfoDetail: state.historyBasicInfoDetail,
      ...state,
    }));
    builder.addCase(histotyBasicInfoSub.pending, (state) => ({
      ...state,
      loadingBasicInfoSub: true,
      histotyBasicInfoSub: {
        data: [],
        pagination: {
          limit: 20,
          page: 1,
          total: 0,
          totalPage: 0,
        },
      },
    }));
    builder.addCase(histotyBasicInfoSub.fulfilled, (state, { payload }) => ({
      ...state,
      loadingBasicInfoSub: false,
      histotyBasicInfoSub: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    builder.addCase(histotyBasicInfoSub.rejected, (state) => ({
      loadingBasicInfoSub: false,
      histotyBasicInfoSub: state.histotyBasicInfoSub,
      ...state,
    }));

    builder.addCase(createBasicInfo.pending, (state) => ({ ...state, loadingBasicInfo: true }));
    builder.addCase(createBasicInfo.fulfilled, (state) => ({
      ...state,
      loadingBasicInfo: false,
    }));
    builder.addCase(createBasicInfo.rejected, (state) => ({ ...state, loadingBasicInfo: false }));
    builder.addCase(updateBasicInfo.pending, (state) => ({ ...state, loadingBasicInfo: true }));
    builder.addCase(updateBasicInfo.fulfilled, (state) => ({
      ...state,
      loadingBasicInfo: false,
    }));
    builder.addCase(updateBasicInfo.rejected, (state) => ({ ...state, loadingBasicInfo: false }));
    builder.addCase(createBasicInfoSub.pending, (state) => ({ ...state, loadingBasicInfoSub: true }));
    builder.addCase(createBasicInfoSub.fulfilled, (state) => ({
      ...state,
      loadingBasicInfoSub: false,
    }));
    builder.addCase(createBasicInfoSub.rejected, (state) => ({ ...state, loadingBasicInfoSub: false }));
    builder.addCase(updateBasicInfoSub.pending, (state) => ({ ...state, loadingBasicInfoSub: true }));
    builder.addCase(updateBasicInfoSub.fulfilled, (state) => ({
      ...state,
      loadingBasicInfoSub: false,
    }));
    builder.addCase(updateBasicInfoSub.rejected, (state) => ({ ...state, loadingBasicInfoSub: false }));

    builder.addCase(deleteBasicInfo.pending, (state) => ({ ...state, loadingBasicInfo: true }));
    builder.addCase(deleteBasicInfo.fulfilled, (state) => ({
      ...state,
      loadingBasicInfo: false,
    }));
    builder.addCase(deleteBasicInfo.rejected, (state) => ({ ...state, loadingBasicInfo: false }));
  },
});
const action = basicInfoSlice.actions;

export { action };
export default basicInfoSlice.reducer;
