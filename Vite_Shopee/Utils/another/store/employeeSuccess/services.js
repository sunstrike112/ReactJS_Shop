import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailEmployeeSuccess,
  updateEmloyeeSuccess,
  deleteEmployeeSuccess,
  historyKof,
  historyRada,
  historyMotivation,
} from './action';

export function ServiceEmployeeSuccess() {
  const dispatch = useDispatch();
  const {
    detailEmployeeSuccess,
    historyRada: stateHistoryRada,
    historyKof: stateHistoryKof,
    historyMotivation: stateHistoryMotivation,
  } = useSelector((state) => state.employeeSuccess);
  const state = { detailEmployeeSuccess, stateHistoryRada, stateHistoryKof, stateHistoryMotivation };
  const event = {
    getDetailEmployeeSuccess: (payload) => dispatch(getDetailEmployeeSuccess(payload)),
    updateEmloyeeSuccess: (payload) => dispatch(updateEmloyeeSuccess(payload)),
  };
  const action = {
    deleteEmployeeSuccess,
    historyKof,
    historyRada,
    historyMotivation,
  };
  return { state, action, event };
}
