import { createSlice } from '@reduxjs/toolkit';
import {
  getDropdownCodeListID,
  historyAllDisplay,
  filterCodeMaster,
  searchDetailDisplay,
  resetDataDetail,
  codeMasterAction,
  deleteCodeMasterAllDisplay,
  addCodeMaster,
  updateCodeMaster,
} from './action';

const { importCsv, exportCsv } = codeMasterAction;
const initialState = {
  dropdownListCodeID: [],
  codeMaster: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  codeMasterHistory: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  loadingCodeMaster: false,
  loadingCodeMasterHistory: false,
};
const CodeMaster = createSlice({
  name: 'codeMaster',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(resetDataDetail, (state) => ({
      ...state,
      codeMaster: initialState.codeMaster,
    }));
    addCase(importCsv.pending, (state) => ({ ...state, loadingCodeMaster: true }));
    addCase(importCsv.fulfilled, (state) => ({ ...state, loadingCodeMaster: false }));
    addCase(importCsv.rejected, (state) => ({ ...state, loadingCodeMaster: false }));
    addCase(exportCsv.pending, (state) => ({ ...state, loadingCodeMaster: true }));
    addCase(exportCsv.fulfilled, (state) => ({ ...state, loadingCodeMaster: false }));
    addCase(exportCsv.rejected, (state) => ({ ...state, loadingCodeMaster: false }));

    addCase(getDropdownCodeListID.pending, (state) => ({ ...state }));
    addCase(getDropdownCodeListID.fulfilled, (state, { payload }) => ({ ...state, dropdownListCodeID: payload }));
    addCase(getDropdownCodeListID.rejected, (state) => ({ ...state }));

    addCase(historyAllDisplay.pending, (state) => ({
      ...state,
      loadingCodeMasterHistory: true,
      codeMasterHistory: initialState.codeMasterHistory,
    }));
    addCase(historyAllDisplay.fulfilled, (state, { payload }) => ({
      ...state,
      loadingCodeMasterHistory: false,
      codeMasterHistory: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyAllDisplay.rejected, (state) => ({ ...state, loadingCodeMasterHistory: false }));

    addCase(filterCodeMaster.pending, (state) => ({ ...state }));
    addCase(filterCodeMaster.fulfilled, (state) => ({ ...state }));
    addCase(filterCodeMaster.rejected, (state) => ({ ...state }));

    addCase(searchDetailDisplay.pending, (state) => ({
      ...state,
      loadingCodeMaster: true,
      codeMaster: initialState.codeMaster,
    }));
    addCase(searchDetailDisplay.fulfilled, (state, { payload }) => ({
      ...state,
      loadingCodeMaster: false,
      codeMaster: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(searchDetailDisplay.rejected, (state) => ({ ...state, loadingCodeMaster: false }));

    addCase(deleteCodeMasterAllDisplay.pending, (state) => ({ ...state, loadingCodeMaster: true }));
    addCase(deleteCodeMasterAllDisplay.fulfilled, (state) => ({ ...state, loadingCodeMaster: false }));
    addCase(deleteCodeMasterAllDisplay.rejected, (state) => ({ ...state, loadingCodeMaster: false }));

    addCase(addCodeMaster.pending, (state) => ({ ...state, loadingCodeMaster: true }));
    addCase(addCodeMaster.fulfilled, (state) => ({ ...state, loadingCodeMaster: false }));
    addCase(addCodeMaster.rejected, (state) => ({ ...state, loadingCodeMaster: false }));

    addCase(updateCodeMaster.pending, (state) => ({ ...state, loadingCodeMaster: true }));
    addCase(updateCodeMaster.fulfilled, (state) => ({ ...state, loadingCodeMaster: false }));
    addCase(updateCodeMaster.rejected, (state) => ({ ...state, loadingCodeMaster: false }));
  },
});
const action = CodeMaster.actions;

export { action };
export default CodeMaster.reducer;
