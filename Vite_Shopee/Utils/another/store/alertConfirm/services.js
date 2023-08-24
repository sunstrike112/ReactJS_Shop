import { useDispatch, useSelector } from 'react-redux';
import { getDashboardAlertConfirm, clearDashboardAlertConfirm, updateColorDashboardAlertConfirmation } from './action';

export function ServiceDashboardAlertConfirm() {
  const { dashboardAlertConfirmData } = useSelector((state) => state.dashboardAlertConfirm);
  const dispatch = useDispatch();
  const getDashboardAlertConfirmAction = (payload) => dispatch(getDashboardAlertConfirm(payload));
  const updateColorDashboardAlertConfirmationAction = (payload) =>
    dispatch(updateColorDashboardAlertConfirmation(payload));
  const clearDashboardAlertConfirmAction = () => dispatch(clearDashboardAlertConfirm());

  return {
    dashboardAlertConfirmData,
    getDashboardAlertConfirmAction,
    updateColorDashboardAlertConfirmationAction,
    clearDashboardAlertConfirmAction,
  };
}
