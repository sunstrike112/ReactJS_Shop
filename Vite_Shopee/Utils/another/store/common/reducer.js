import { createSlice } from '@reduxjs/toolkit';
import { getDropdown, getMenuFilter, getDropdownRole, getDropdownWorkflowADMIN } from './action';

const initialState = {
  dropdown: {
    ES_STATUS: [],
    GENDER: [],
    ROLE: [],
    COMP_JOINED_ROUTE: [],
    JOB_CONTENT: [],
    RELATIONSHIP: [],
    CAREER: [],
    MONEY: [],
    WORKING_WAY: [],
    OTHERS: [],
    RETIREMENT: [],
  },
  menuFilter: [],
  loadingMenuFilter: false,
  dropdownRole: [],
  dropdownWorkflowAdmin: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getDropdown.pending, (state) => ({ ...state }));
    addCase(getDropdown.fulfilled, (state, action) => {
      const type = action.meta.arg.type?.codeListIds?.[0] || '';
      const valueDropdown = action.payload.records.map((item) => ({
        value: item.codeValue,
        label: item.codeName,
      }));
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          [type]: valueDropdown,
        },
      };
    });
    addCase(getDropdown.rejected, (state) => ({ ...state }));

    addCase(getMenuFilter.pending, (state) => ({ ...state, loadingMenuFilter: true }));
    addCase(getMenuFilter.fulfilled, (state, { payload }) => ({
      ...state,
      menuFilter: payload,
      loadingMenuFilter: false,
    }));
    addCase(getMenuFilter.rejected, (state) => ({ ...state, loadingMenuFilter: false }));

    addCase(getDropdownRole.pending, (state) => ({ ...state }));
    addCase(getDropdownRole.fulfilled, (state, { payload }) => ({
      ...state,
      dropdownRole: payload,
    }));
    addCase(getDropdownRole.rejected, (state) => ({ ...state }));

    addCase(getDropdownWorkflowADMIN.pending, (state) => ({ ...state }));
    addCase(getDropdownWorkflowADMIN.fulfilled, (state, { payload }) => ({
      ...state,
      dropdownWorkflowAdmin: payload,
    }));
    addCase(getDropdownWorkflowADMIN.rejected, (state) => ({ ...state }));
  },
});
const action = commonSlice.actions;

export { action };
export default commonSlice.reducer;
