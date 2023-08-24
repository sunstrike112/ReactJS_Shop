import { currentLanguage } from 'dhm/contexts/TranslateContext';
import { TYPE_SELECT } from 'dhm/utils/constants/select';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearConfirmProjectInfo,
  createProjectInfo,
  getHistoryProjectInfo,
  getProjectInfo,
  updateProjectInfo,
} from './action';

export const ServiceProjectInfo = () => {
  const { projectInfo, historyProjectInfo, confirmProjectInfo } = useSelector((state) => state.projectInfo);
  const { listPreferenceCodeMaster } = useSelector((state) => state.policyProgress);
  const { staffSummary } = useSelector((state) => state.summary);
  const dispatch = useDispatch();
  const getProjectInfoAction = (payload) => dispatch(getProjectInfo(payload));
  const createProjectInfoAction = (payload) => dispatch(createProjectInfo(payload));
  const updateProjectInfoAction = (payload) => dispatch(updateProjectInfo(payload));
  const clearConfirmProjectInfoAction = () => dispatch(clearConfirmProjectInfo());

  const optionBusinessCategory = [...listPreferenceCodeMaster.data]?.filter(
    (option) => option?.codeListId === TYPE_SELECT.BUSINESS_CATEGORY,
  );

  const OPTIONS_BUSINESS_CATEGORY = [...optionBusinessCategory].map((item) => ({
    value: item.codeValue.toString(),
    label: currentLanguage('jp') ? item.codeName : item.codeNameEn,
  }));

  const optionRecognizePerson = [...listPreferenceCodeMaster.data]?.filter(
    (option) => option?.codeListId === TYPE_SELECT.RECOGNIZE_PERSON,
  );

  const OPTIONS_RECOGNIZE_PERSON = [...optionRecognizePerson].map((item) => ({
    value: item.codeValue.toString(),
    id: item.codeValue.toString(),
    label: currentLanguage('jp') ? item.codeName : item.codeNameEn,
  }));

  return {
    staffSummary,
    projectInfo,
    confirmProjectInfo,
    historyProjectInfo,
    getProjectInfo,
    getHistoryProjectInfo,
    OPTIONS_BUSINESS_CATEGORY,
    OPTIONS_RECOGNIZE_PERSON,
    clearConfirmProjectInfoAction,
    getProjectInfoAction,
    createProjectInfoAction,
    updateProjectInfoAction,
  };
};
