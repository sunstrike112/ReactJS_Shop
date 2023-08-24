import { createSlice } from '@reduxjs/toolkit';
import { getDashboardAlertConfirm, clearDashboardAlertConfirm } from './action';

const initialState = {
  loadingDashboardAlertConfirm: false,
  dashboardAlertConfirmData: {
    total: 0,
    status: {
      red: 0,
      blue: 0,
      yellow: 0,
    },
    requiredFlag: {
      date_exceeded: 0,
      before_deadline: 0,
    },
    eachFlg: {
      notInOperation: 0,
      pinasa: 0,
      overtime: 0,
      maternityLeave: 0,
      onLeave: 0,
    },
    interviewNotConducted: {
      moreThan1Month: 0,
      moreThan2Month: 0,
      moreThan3Month: 0,
      moreThan4Month: 0,
    },
    promotion: [
      {
        name_en: 'A',
        total: 0,
        name: 'A',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name_en: 'B',
        total: 0,
        name: 'B',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name_en: 'C',
        total: 0,
        name: 'C',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name_en: 'D',
        total: 0,
        name: 'D',
        background_color: 'white',
        text_color: 'gray',
      },
    ],
    t_risk: [
      {
        name: 'リスクなし',
        total: 0,
        name_en: 'no risk',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: '不明',
        total: 0,
        name_en: 'not clear',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: 'リスク有',
        total: 0,
        name_en: 'with risk',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: 'リスク高!!',
        total: 0,
        name_en: 'High risk!!',
        background_color: 'white',
        text_color: 'gray',
      },
    ],
    esStatus: [
      {
        name: '不明',
        total: 0,
        name_en: 'Not clear',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: '問題あり',
        total: 0,
        name_en: 'Problem',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: '問題なし',
        total: 0,
        name_en: 'No problem',
        background_color: 'white',
        text_color: 'gray',
      },
    ],
    recOfPerson: [
      {
        name: 'やりたい',
        total: 0,
        name_en: 'Want to do',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: 'どちらでもいい',
        total: 0,
        name_en: 'Whichever',
        background_color: 'white',
        text_color: 'gray',
      },
      {
        name: 'やりたくない',
        total: 0,
        name_en: 'Do not want to',
        background_color: 'white',
        text_color: 'gray',
      },
    ],
  },
};

const dashboardAlertConfirmSlice = createSlice({
  name: 'dashboardAlertConfirm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clearDashboardAlertConfirm, (state) => ({
      ...state,
      dashboardAlertConfirmData: initialState.dashboardAlertConfirmData,
    }));

    builder.addCase(getDashboardAlertConfirm.pending, (state) => ({ ...state, loadingDashboardAlertConfirm: true }));
    builder.addCase(getDashboardAlertConfirm.fulfilled, (state, { payload }) => ({
      ...state,
      dashboardAlertConfirmData: payload,
      loadingDashboardAlertConfirm: false,
    }));
    builder.addCase(getDashboardAlertConfirm.rejected, (state) => ({ ...state, loadingDashboardAlertConfirm: false }));
  },
});
const action = dashboardAlertConfirmSlice.actions;

export { action };
export default dashboardAlertConfirmSlice.reducer;
