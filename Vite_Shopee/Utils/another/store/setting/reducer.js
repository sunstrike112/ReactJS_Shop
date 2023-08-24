import { createSlice } from '@reduxjs/toolkit';
import { inviteUser } from './action';

const initialState = {
  settingInvite: {
    data: [],
  },
};

const settingSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(inviteUser.pending, (state) => ({ ...state }));
    builder.addCase(inviteUser.fulfilled, (state, { payload }) => ({
      ...state,
      settingInvite: {
        data: payload.records || [],
      },
    }));
    builder.addCase(inviteUser.rejected, (state) => ({ ...state }));
  },
});
const action = settingSlice.actions;

export { action };
export default settingSlice.reducer;
