import { TYPE_SELECT } from 'dhm/utils/constants/select';
import { useDispatch, useSelector } from 'react-redux';
import { currentLanguage } from 'dhm/contexts/TranslateContext';
import {
  deletePolicyProgress,
  getHistoryPolicyProgress,
  getHistoryPromotion,
  getHistoryTRisk,
  getPolicyProgress,
  getTobeFY,
  updatePolicyProgress,
} from './action';

export const ServicePolicyProgress = () => {
  const { policyProgress, historyPolicyProgress, historyTRisk, historyPromotion, listPreferenceCodeMaster } =
    useSelector((state) => state.policyProgress);
  const { staffSummary } = useSelector((state) => state.summary);
  const dispatch = useDispatch();
  const getPolicyProgressAction = (payload) => dispatch(getPolicyProgress(payload));
  const updatePolicyProgressAction = (payload) => dispatch(updatePolicyProgress(payload));
  const deletePolicyProgressAction = (payload) => dispatch(deletePolicyProgress(payload));
  const getTobeFYAction = (payload) => dispatch(getTobeFY(payload));

  const optionsTobeFY = [...listPreferenceCodeMaster.data]?.filter(
    (option) => option?.codeListId === TYPE_SELECT.TOBE_FY,
  );
  const optionsTRisk = [...listPreferenceCodeMaster.data]?.filter(
    (option) => option?.codeListId === TYPE_SELECT.T_RISK,
  );

  const OPTIONS_TOBEFY = [...optionsTobeFY].map((item) => ({
    value: item.codeValue.toString(),
    label: currentLanguage('jp') ? item.codeName : item.codeNameEn,
  }));
  const OPTIONS_TRISK = [...optionsTRisk].map((item) => ({
    value: item.codeValue.toString(),
    label: currentLanguage('jp') ? item.codeName : item.codeNameEn,
  }));

  const historyPromotionGenerated = {
    ...historyPromotion,
    data: historyPromotion.data.map((item) => ({
      ...item,
      tobeFyFiscal: OPTIONS_TOBEFY.find((option) => option.value === item.tobeFyFiscal)?.label,
      tobeFyFiscalPlus1: OPTIONS_TOBEFY.find((option) => option.value === item.tobeFyFiscalPlus1)?.label,
      tobeFyFiscalPlus2: OPTIONS_TOBEFY.find((option) => option.value === item.tobeFyFiscalPlus2)?.label,
      tobeFyFiscalPlus3: OPTIONS_TOBEFY.find((option) => option.value === item.tobeFyFiscalPlus3)?.label,
    })),
  };
  const historyTRiskGenerated = {
    ...historyTRisk,
    data: historyTRisk.data.map((item) => ({
      ...item,
      riskSelection: OPTIONS_TRISK.find((option) => option.value === item.riskSelection)?.label,
    })),
  };

  return {
    staffSummary,
    policyProgress,
    deletePolicyProgress,
    historyPolicyProgress,
    historyTRisk,
    historyTRiskGenerated,
    historyPromotion,
    historyPromotionGenerated,
    listPreferenceCodeMaster,
    OPTIONS_TOBEFY,
    OPTIONS_TRISK,
    optionsTRisk,
    optionsTobeFY,
    getHistoryPromotion,
    getHistoryPolicyProgress,
    getHistoryTRisk,
    getPolicyProgressAction,
    updatePolicyProgressAction,
    deletePolicyProgressAction,
    getTobeFYAction,
  };
};
