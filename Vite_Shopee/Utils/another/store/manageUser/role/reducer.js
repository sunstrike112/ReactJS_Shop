import { createSlice } from '@reduxjs/toolkit';
import {
  searchRole,
  createRole,
  updateRole,
  filterRole,
  deleteRole,
  historyRole,
  getListPermission,
  getDetailPermission,
} from './action';

const initialState = {
  loadingRole: false,
  loadingRoleHistory: false,
  role: {
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
  roleHistory: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  listPermission: [],
  detailPermission: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(searchRole.pending, (state) => ({ ...state, loadingRole: true, role: initialState.role }));
    addCase(searchRole.fulfilled, (state, { payload }) => ({
      ...state,
      loadingRole: false,
      role: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(searchRole.rejected, (state) => ({ ...state, loadingRole: false }));

    addCase(createRole.pending, (state) => ({ ...state, loadingRole: true }));
    addCase(createRole.fulfilled, (state) => ({ ...state, loadingRole: false }));
    addCase(createRole.rejected, (state) => ({ ...state, loadingRole: false }));

    addCase(updateRole.pending, (state) => ({ ...state, loadingRole: true }));
    addCase(updateRole.fulfilled, (state) => ({ ...state, loadingRole: false }));
    addCase(updateRole.rejected, (state) => ({ ...state, loadingRole: false }));

    addCase(filterRole.pending, (state) => ({ ...state, esFilter: initialState.esFilter }));
    addCase(filterRole.fulfilled, (state, { payload }) => ({
      ...state,
      esFilter: {
        data: payload.records,
      },
    }));
    addCase(filterRole.rejected, (state) => ({ ...state }));

    addCase(deleteRole.pending, (state) => ({ ...state, loadingRole: true }));
    addCase(deleteRole.fulfilled, (state) => ({ ...state, loadingRole: false }));
    addCase(deleteRole.rejected, (state) => ({ ...state, loadingRole: false }));

    addCase(historyRole.pending, (state) => ({
      ...state,
      loadingRoleHistory: true,
      roleHistory: initialState.roleHistory,
    }));
    addCase(historyRole.fulfilled, (state, { payload }) => ({
      ...state,
      loadingRoleHistory: false,
      roleHistory: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyRole.rejected, (state) => ({ ...state, loadingRoleHistory: false }));

    addCase(getListPermission.pending, (state) => ({
      ...state,
      loadingRole: true,
      listPermission: [],
      detailPermission: [],
    }));
    addCase(getListPermission.fulfilled, (state, { payload }) => ({
      ...state,
      loadingRole: false,
      listPermission: payload,
    }));
    addCase(getListPermission.rejected, (state) => ({ ...state, loadingRole: false, listPermission: [] }));

    addCase(getDetailPermission.pending, (state) => ({ ...state, loadingRole: true, detailPermission: [] }));
    addCase(getDetailPermission.fulfilled, (state, { payload }) => ({
      ...state,
      loadingRole: false,
      detailPermission: payload,
    }));
    addCase(getDetailPermission.rejected, (state) => ({ ...state, loadingRole: false, detailPermission: [] }));
  },
});
const action = roleSlice.actions;

export { action };
export default roleSlice.reducer;
