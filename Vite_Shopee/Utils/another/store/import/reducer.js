import { createSlice } from '@reduxjs/toolkit';
import { importAll } from './action';

const initialState = {
  loadingImport: false,
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(importAll.pending, (state) => ({ ...state, loadingImport: true }));
    addCase(importAll.fulfilled, (state) => ({ ...state, loadingImport: false }));
    addCase(importAll.rejected, (state) => ({ ...state, loadingImport: false }));
  },
});
const action = importSlice.actions;

export { action };
export default importSlice.reducer;
