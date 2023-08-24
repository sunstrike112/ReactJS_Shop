import { createSlice } from '@reduxjs/toolkit';
import {
  searchEsMaster,
  createEsMaster,
  updateEsMaster,
  filterEsMaster,
  deleteEsMaster,
  historyEsMaster,
  getDropdown,
  getCheckLeaderEsMaster,
} from './action';

const initialState = {
  loadingEsMaster: false,
  loadingEsMasterHistory: false,
  esMaster: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  esFilter: {
    data: [],
  },
  esMasterHistory: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  dropdownEs: [],
  isHaveMember: false,
};

const esMasterSlice = createSlice({
  name: 'esMaster',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(searchEsMaster.pending, (state) => ({ ...state, loadingEsMaster: true, esMaster: initialState.esMaster }));
    addCase(searchEsMaster.fulfilled, (state, { payload }) => ({
      ...state,
      loadingEsMaster: false,
      esMaster: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(searchEsMaster.rejected, (state) => ({ ...state, loadingEsMaster: false }));

    addCase(createEsMaster.pending, (state) => ({ ...state, loadingEsMaster: true }));
    addCase(createEsMaster.fulfilled, (state) => ({ ...state, loadingEsMaster: false }));
    addCase(createEsMaster.rejected, (state) => ({ ...state, loadingEsMaster: false }));

    addCase(updateEsMaster.pending, (state) => ({ ...state, loadingEsMaster: true }));
    addCase(updateEsMaster.fulfilled, (state) => ({ ...state, loadingEsMaster: false }));
    addCase(updateEsMaster.rejected, (state) => ({ ...state, loadingEsMaster: false }));

    addCase(filterEsMaster.pending, (state) => ({ ...state, esFilter: initialState.esFilter }));
    addCase(filterEsMaster.fulfilled, (state, { payload }) => ({
      ...state,
      esFilter: {
        data: payload.records,
      },
    }));
    addCase(filterEsMaster.rejected, (state) => ({ ...state }));

    addCase(deleteEsMaster.pending, (state) => ({ ...state, loadingEsMaster: true }));
    addCase(deleteEsMaster.fulfilled, (state) => ({ ...state, loadingEsMaster: false }));
    addCase(deleteEsMaster.rejected, (state) => ({ ...state, loadingEsMaster: false }));

    addCase(historyEsMaster.pending, (state) => ({
      ...state,
      loadingEsMasterHistory: true,
      esMasterHistory: initialState.esMasterHistory,
    }));
    addCase(historyEsMaster.fulfilled, (state, { payload }) => ({
      ...state,
      loadingEsMasterHistory: false,
      esMasterHistory: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyEsMaster.rejected, (state) => ({ ...state, loadingEsMasterHistory: false }));

    addCase(getDropdown.pending, (state) => ({
      ...state,
      dropdownEs: [],
    }));
    addCase(getDropdown.fulfilled, (state, { payload }) => {
      const renderList = payload?.map((item) => ({
        value: item?.userCode,
        label: item?.userCode,
      }));
      return {
        ...state,
        dropdownEs: renderList,
      };
    });
    addCase(getDropdown.rejected, (state) => ({ ...state, dropdownEs: [] }));

    addCase(getCheckLeaderEsMaster.pending, (state) => ({ ...state, isHaveMember: false }));
    addCase(getCheckLeaderEsMaster.fulfilled, (state, { payload }) => ({ ...state, isHaveMember: payload }));
    addCase(getCheckLeaderEsMaster.rejected, (state) => ({ ...state, isHaveMember: false }));
  },
});
const action = esMasterSlice.actions;

export { action };
export default esMasterSlice.reducer;
