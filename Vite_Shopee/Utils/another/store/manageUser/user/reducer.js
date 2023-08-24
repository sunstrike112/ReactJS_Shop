import { createSlice } from '@reduxjs/toolkit';
import { searchUser, createUser, updateUser, filterUser, historyUser, importUser } from './action';

const initialState = {
  loadingUser: false,
  loadingUserHistory: false,
  user: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
  userHistory: {
    data: [],
    pagination: {
      limit: 10,
      page: 1,
      total: 0,
      totalPage: 0,
    },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(searchUser.pending, (state) => ({ ...state, loadingUser: true, user: initialState.user }));
    addCase(searchUser.fulfilled, (state, { payload }) => ({
      ...state,
      loadingUser: false,
      user: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(searchUser.rejected, (state) => ({ ...state, loadingUser: false }));

    addCase(createUser.pending, (state) => ({ ...state, loadingUser: true }));
    addCase(createUser.fulfilled, (state) => ({ ...state, loadingUser: false }));
    addCase(createUser.rejected, (state) => ({ ...state, loadingUser: false }));

    addCase(updateUser.pending, (state) => ({ ...state, loadingUser: true }));
    addCase(updateUser.fulfilled, (state) => ({ ...state, loadingUser: false }));
    addCase(updateUser.rejected, (state) => ({ ...state, loadingUser: false }));

    addCase(filterUser.pending, (state) => ({ ...state, userFilter: initialState.userFilter }));
    addCase(filterUser.fulfilled, (state, { payload }) => ({
      ...state,
      userFilter: {
        data: payload.records,
      },
    }));
    addCase(filterUser.rejected, (state) => ({ ...state }));

    addCase(historyUser.pending, (state) => ({
      ...state,
      loadingUserHistory: true,
      userHistory: initialState.userHistory,
    }));
    addCase(historyUser.fulfilled, (state, { payload }) => ({
      ...state,
      loadingUserHistory: false,
      userHistory: {
        data: payload.records,
        pagination: {
          limit: payload.limit,
          page: payload.page,
          total: payload.total,
          totalPage: payload.totalPage,
        },
      },
    }));
    addCase(historyUser.rejected, (state) => ({ ...state, loadingUserHistory: false }));

    addCase(importUser.pending, (state) => ({ ...state, loadingUser: true }));
    addCase(importUser.fulfilled, (state) => ({ ...state, loadingUser: false }));
    addCase(importUser.rejected, (state) => ({ ...state, loadingUser: false }));
  },
});
const action = userSlice.actions;

export { action };
export default userSlice.reducer;
