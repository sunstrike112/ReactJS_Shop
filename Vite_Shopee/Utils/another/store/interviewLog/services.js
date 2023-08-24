import { currentLanguage } from 'dhm/contexts/TranslateContext';
import { TYPE_SELECT } from 'dhm/utils/constants/select';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInterviewLog,
  getHistoryInterviewLog,
  createInterviewLog,
  updateInterviewLog,
  getEsMngPred,
} from './action';

export const ServicesInterviewLog = () => {
  const { interviewLog, historyInterviewLog, listEsMngPred, loadingListEsManger } = useSelector(
    (state) => state.interviewLog,
  );
  const { listPreferenceCodeMaster } = useSelector((state) => state.policyProgress);
  const { staffSummary } = useSelector((state) => state.summary);
  const dispatch = useDispatch();
  const getInterviewLogAction = (payload) => dispatch(getInterviewLog(payload));
  const getHistoryInterviewLogAction = (payload) => dispatch(getHistoryInterviewLog(payload));
  const createInterviewLogAction = (payload) => dispatch(createInterviewLog(payload));
  const updateInterviewLogAction = (payload) => dispatch(updateInterviewLog(payload));
  const getEsMngPredAction = (payload) => dispatch(getEsMngPred(payload));

  const optionInterviewCategory = [...listPreferenceCodeMaster.data]?.filter(
    (option) => option?.codeListId === TYPE_SELECT.INTERVIEW_CATEGORY,
  );

  const OPTIONS_INTERVIEW_CATEGORY = [...optionInterviewCategory].map((item) => ({
    value: item.codeValue.toString(),
    label: currentLanguage('jp') ? item.codeName : item.codeNameEn,
  }));

  return {
    staffSummary,
    interviewLog,
    historyInterviewLog,
    listEsMngPred,
    loadingListEsManger,
    getInterviewLog,
    getInterviewLogAction,
    OPTIONS_INTERVIEW_CATEGORY,
    getHistoryInterviewLog,
    getHistoryInterviewLogAction,
    createInterviewLogAction,
    updateInterviewLogAction,
    getEsMngPredAction,
  };
};
