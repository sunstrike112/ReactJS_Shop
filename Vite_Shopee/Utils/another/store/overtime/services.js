import { useDispatch, useSelector } from 'react-redux';
import {
  clearConfirmOvertimeImport,
  clearConfirmOvertimeSetting,
  clearYearOvertimeSetting,
  createOvertime,
  getHistoryOvertimeSetting,
  getOvertime,
  getYearOvertimeSetting,
  importOvertime,
  updateOvertime,
} from './action';

export function ServiceOvertime() {
  const { confirmOvertime, confirmOvertimeSetting, historyOvertimeSetting, overTimeData, yearOvertimeSetting } =
    useSelector((state) => state.overtime);
  const dispatch = useDispatch();
  const importOvertimeAction = (payload) => dispatch(importOvertime(payload));
  const clearConfirmOvertimeImportAction = () => dispatch(clearConfirmOvertimeImport());
  const clearConfirmOvertimeSettingAction = () => dispatch(clearConfirmOvertimeSetting());
  const clearYearOvertimeSettingAction = () => dispatch(clearYearOvertimeSetting());
  const createOvertimeAction = (payload) => dispatch(createOvertime(payload));
  const updateOvertimeAction = (payload) => dispatch(updateOvertime(payload));
  const getHistoryOvertimeSettingAction = (payload) => dispatch(getHistoryOvertimeSetting(payload));
  const getOvertimeAction = (payload) => dispatch(getOvertime(payload));
  const getYearOvertimeSettingAction = (payload) => dispatch(getYearOvertimeSetting(payload));
  return {
    confirmOvertime,
    importOvertimeAction,
    clearConfirmOvertimeImportAction,
    clearConfirmOvertimeSettingAction,
    confirmOvertimeSetting,
    createOvertimeAction,
    updateOvertimeAction,
    historyOvertimeSetting,
    getHistoryOvertimeSetting,
    getHistoryOvertimeSettingAction,
    overTimeData,
    getOvertimeAction,
    yearOvertimeSetting,
    getYearOvertimeSettingAction,
    clearYearOvertimeSettingAction,
  };
}
