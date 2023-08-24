import { useDispatch, useSelector } from 'react-redux';
import {
  getImportProcessList,
  assignImportProcess,
  getListApproverAndAgent,
  getProcessListIncomplete,
  getProcessListCompleted,
  getHistoryProcess,
  updateProcess,
  getDetailProcess,
} from './action';

export function ServiceWorkflow() {
  const {
    listImportProcess,
    listApproverAndAgent,
    listProcessIncomplete,
    listProcessCompleted,
    listHistoryProcess,
    detailProcess,
    waitingDetail,
  } = useSelector((state) => state.workflow);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getImportProcessListAction = (payload) => dispatch(getImportProcessList(payload));
  const getListApproverAndAgentAction = () => dispatch(getListApproverAndAgent());
  const assignImportProcessAction = (payload) => dispatch(assignImportProcess(payload));
  const updateProcessAction = (payload) => dispatch(updateProcess(payload));
  const getProcessListCompletedAction = (payload) => dispatch(getProcessListCompleted(payload));
  const getProcessListIncompleteAction = (payload) => dispatch(getProcessListIncomplete(payload));
  const getHistoryProcessAction = (payload) => dispatch(getHistoryProcess(payload));
  const getDetailProcessAction = (payload) => dispatch(getDetailProcess(payload));

  const LIST_APPROVER_AND_AGENT = listApproverAndAgent.map((item) => ({
    value: item.email,
    label: item.userName,
  }));

  return {
    user,
    detailProcess,
    LIST_APPROVER_AND_AGENT,
    listHistoryProcess,
    listProcessIncomplete,
    listProcessCompleted,
    listImportProcess,
    listApproverAndAgent,
    getImportProcessList,
    getHistoryProcess,
    getProcessListIncomplete,
    getProcessListCompleted,
    getHistoryProcessAction,
    getImportProcessListAction,
    getListApproverAndAgentAction,
    getProcessListCompletedAction,
    getProcessListIncompleteAction,
    getDetailProcessAction,
    assignImportProcessAction,
    updateProcessAction,
    waitingDetail,
  };
}
