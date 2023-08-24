import { createSlice } from '@reduxjs/toolkit';
import {
  searchDepartment,
  createDepartment,
  deleteDepartment,
  filterDepartment,
  updateDepartment,
  searchDepartmentBackup,
  historyDetailDepartment,
} from './action';

const initialState = {
  departmentMaster: {
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
    data: [],
  },
  departmentFilter: {
    data: [],
  },
  departmentHistory: {
    data: [],
  },
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchDepartment.pending, (state) => ({ ...state }));
    builder.addCase(searchDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      departmentMaster: {
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
        data: payload.records || [],
      },
    }));
    builder.addCase(searchDepartment.rejected, (state) => ({ ...state }));
    builder.addCase(searchDepartmentBackup.pending, (state) => ({ ...state }));
    builder.addCase(searchDepartmentBackup.fulfilled, (state, { payload }) => ({
      ...state,
      departmentMaster: {
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
        data: payload.records || [],
      },
    }));
    builder.addCase(searchDepartmentBackup.rejected, (state) => ({ ...state }));
    builder.addCase(filterDepartment.pending, (state) => ({ ...state }));
    builder.addCase(filterDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      departmentFilter: {
        data: payload.records || [],
      },
    }));
    builder.addCase(filterDepartment.rejected, (state) => ({ ...state }));
    builder.addCase(createDepartment.pending, (state) => ({ ...state }));
    builder.addCase(createDepartment.fulfilled, (state) => ({ ...state }));
    builder.addCase(createDepartment.rejected, (state) => ({ ...state }));
    builder.addCase(deleteDepartment.pending, (state) => ({ ...state }));
    builder.addCase(deleteDepartment.fulfilled, (state) => ({ ...state }));
    builder.addCase(deleteDepartment.rejected, (state) => ({ ...state }));
    builder.addCase(updateDepartment.pending, (state) => ({ ...state }));
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      const payload = action.meta.arg.data;
      const newDepartmentMaster = {
        ...state.departmentMaster,
        data: state.departmentMaster.data.map((item) => {
          if (item.departmentId === payload.departmentId) {
            return payload;
          }
          return item;
        }),
      };
      return {
        ...state,
        departmentMaster: newDepartmentMaster,
      };
    });
    builder.addCase(updateDepartment.rejected, (state) => ({ ...state }));
    builder.addCase(historyDetailDepartment.pending, (state) => ({ ...state }));
    builder.addCase(historyDetailDepartment.fulfilled, (state, { payload }) => ({
      ...state,
      departmentHistory: {
        data: payload.records || [],
      },
    }));
    builder.addCase(historyDetailDepartment.rejected, (state) => ({ ...state }));
  },
});
const action = departmentSlice.actions;

export { action };
export default departmentSlice.reducer;
