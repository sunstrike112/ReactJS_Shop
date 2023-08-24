import { useDisclosure } from '@chakra-ui/react';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { createBasicInfo } from 'dhm/store/basicInfo/action';
import { getSummaryStaff } from 'dhm/store/summary/action';
import { MESS_ERROR } from 'dhm/utils/constants/messageId';
import { isSameObj } from 'dhm/utils/helpers/condition';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ViewCRUD } from './ViewCRUD';
import { dataPayloadMain, dataPayloadSub } from './config';

export function CRUDForm({
  modeForm = 'create',
  onClose = () => {},
  originData = {},
  callbackAction = () => {},
  modeFeature = 'origin',
  isEditing = false,
  setIsActiveForm = () => {},
  setParamsChildren = () => {},
  isActiveForm,
}) {
  const isViewWorkflow = modeFeature === 'workflow';
  const isEditWorkflow = ({ track = isEditing, other }) => (isViewWorkflow ? track : other);
  const {
    can = '',
    will = '',
    royaltiesDescription,
    royaltiesOptional,
    updatedDatetime,
    updatedUser,
  } = originData.dataSub;
  const { tTable } = useContext(LanguageContext);
  const [editing, setEditing] = useState(true);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { isOpen: isOpenRetirement, onOpen: onOpenRetirement, onClose: onCloseRetirement } = useDisclosure();
  const { tForm } = useContext(LanguageContext);
  const [esResponsibility, setEsResponsibility] = useState(false);
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: { ...originData.data, ...originData?.dataSub },
    mode: 'onChange',
  });

  const { setValue, watch, getValues } = methods;
  useEffect(() => {
    if (isViewWorkflow) {
      if (Object.keys(originData.data)) {
        methods.reset({ ...methods.formState.defaultValues, ...originData.data });
      }
    }
  }, [originData.data]);
  const { setError, clearError, isValid, isEmpty, ShowError, isFieldInvalid } = DHMHook.useSetError();
  const { ID_KEY, canEdit } = useContext(AbilityContext);

  const navigate = useNavigate();
  const onSuccess = () => {
    callbackAction();
    onClose();
  };
  useEffect(() => {
    if (originData.data.retirement === '02') {
      setEditing(false);
    }
  }, []);
  const getDataJoiningCompanyReason = () => {
    const { joiningCompanyReason = '', esResponsibility: esStatus } = originData.data;
    const joiningCompanyReasonArr = joiningCompanyReason?.split('|') || [];
    setValue('joiningCompanyReason1', joiningCompanyReasonArr[0]?.trim());
    setValue('joiningCompanyReason2', joiningCompanyReasonArr[1]?.trim());
    setValue('joiningCompanyReason3', joiningCompanyReasonArr[2]?.trim());
    setValue('joiningCompanyReason4', joiningCompanyReasonArr[3]?.trim());
    setEsResponsibility(esStatus);
  };
  const getDataSub = () => {
    const canArr = can?.split('|') || [];
    const willArr = will?.split('|') || [];
    setValue('can1', canArr[0]?.trim());
    setValue('can2', canArr[1]?.trim());
    setValue('will1', willArr[0]?.trim());
    setValue('will2', willArr[1]?.trim());
    setValue('royaltiesOptional', +royaltiesOptional || '');
    setValue('royaltiesDescription', royaltiesDescription);
  };
  useEffect(() => {
    if (Object.keys(originData.data).length) {
      getDataJoiningCompanyReason();
    }
  }, [originData.data]);
  useEffect(() => {
    if (Object.keys(originData.dataSub).length) {
      getDataSub();
    }
  }, [originData.dataSub]);

  const {
    joiningPathDescription,
    joiningPathOptional,
    can1: ca1 = '',
    can2: ca2 = '',
    will1: wi1 = '',
    will2: wi2 = '',
    joiningCompanyReason1: reas1 = '',
    joiningCompanyReason2: reas2 = '',
    joiningCompanyReason3: reas3 = '',
    joiningCompanyReason4: reas4 = '',
    retirement,
    retirementDate,
  } = watch();
  const checkCa = useMemo(() => Boolean(!ca1 && !ca2), [ca1, ca2]);
  const checkWi = useMemo(() => !wi1 && !wi2, [wi1, wi2]);
  const checkReas = useMemo(() => !reas1 && !reas2 && !reas3 && !reas4, [reas1, reas2, reas3, reas4]);

  useEffect(() => {
    if (checkCa) {
      setError('can', {
        type: 'required',
        message: MESS_ERROR.BASIC_INFO.can,
      });
    } else {
      clearError('can');
    }
  }, [checkCa]);
  useEffect(() => {
    const { joiningCompanyReason = '' } = originData.data;

    if (!can) {
      setValue('can1', '_');
      setTimeout(() => {
        setValue('can1', '');
      }, 10);
    }
    if (!will) {
      setValue('will1', '_');
      setTimeout(() => {
        setValue('will1', '');
      }, 10);
    }
    if (!joiningCompanyReason) {
      setValue('joiningCompanyReason1', '_');
      setTimeout(() => {
        setValue('joiningCompanyReason1', '');
      }, 10);
    }
  }, []);
  useEffect(() => {
    if (checkWi) {
      setError('will', {
        type: 'required',
        message: MESS_ERROR.BASIC_INFO.will,
      });
    } else {
      clearError('will');
    }
  }, [checkWi]);

  useEffect(() => {
    if (checkReas) {
      setError('joiningCompanyReason', {
        type: 'required',
        message: MESS_ERROR.BASIC_INFO.joiningCompanyReason,
      });
    } else {
      clearError('joiningCompanyReason');
    }
  }, [checkReas]);

  const checkCaLength = useMemo(() => {
    let result = false;
    if (ca1 && !ca2) {
      result = ca1.length > 300;
    }
    if (!ca1 && ca2) {
      result = ca2.length > 300;
    }
    if (ca1 && ca2) {
      result = ca1.length + ca2.length > 299;
    }
    return result;
  });
  const checkWiLength = useMemo(() => {
    let result = false;
    if (wi1 && !wi2) {
      result = wi1.length > 300;
    }
    if (!wi1 && wi2) {
      result = wi2.length > 300;
    }
    if (wi1 && wi2) {
      result = wi1.length + wi2.length > 299;
    }
    return result;
  }, [wi1, wi2]);
  const checkReasLength = useMemo(() => {
    let result = false;
    if (reas1 && !reas2 && !reas3 && !reas4) {
      result = reas1.length > 300;
    }
    if (!reas1 && reas2 && !reas3 && !reas4) {
      result = reas2.length > 300;
    }
    if (!reas1 && !reas2 && reas3 && !reas4) {
      result = reas3.length > 300;
    }
    if (!reas1 && !reas2 && !reas3 && reas4) {
      result = reas4.length > 300;
    }
    if (reas1 && reas2 && !reas3 && !reas4) {
      result = reas1.length + reas2.length > 299;
    }
    if (reas1 && !reas2 && reas3 && !reas4) {
      result = reas1.length + reas3.length > 299;
    }
    if (reas1 && !reas2 && !reas3 && reas4) {
      result = reas1.length + reas4.length > 299;
    }
    if (!reas1 && reas2 && reas3 && !reas4) {
      result = reas2.length + reas3.length > 299;
    }
    if (!reas1 && reas2 && !reas3 && reas4) {
      result = reas2.length + reas4.length > 299;
    }
    if (!reas1 && !reas2 && reas3 && reas4) {
      result = reas3.length + reas4.length > 299;
    }
    if (reas1 && reas2 && reas3 && !reas4) {
      result = reas1.length + reas2.length + reas3.length > 298;
    }
    if (reas1 && reas2 && !reas3 && reas4) {
      result = reas1.length + reas2.length + reas4.length > 298;
    }
    if (reas1 && !reas2 && reas3 && reas4) {
      result = reas1.length + reas3.length + reas4.length > 298;
    }
    if (!reas1 && reas2 && reas3 && reas4) {
      result = reas2.length + reas3.length + reas4.length > 298;
    }
    if (reas1 && reas2 && reas3 && reas4) {
      result = reas1.length + reas2.length + reas3.length + reas4.length > 297;
    }
    return result;
  }, [reas1, reas2, reas3, reas4]);

  useEffect(() => {
    if (checkCaLength) {
      setError('can', {
        type: 'maxLength',
        message: MESS_ERROR.BASIC_INFO.canLength,
      });
    } else {
      clearError('can');
    }
  }, [checkCaLength]);

  useEffect(() => {
    if (checkWiLength) {
      setError('will', {
        type: 'maxLength',
        message: MESS_ERROR.BASIC_INFO.willLength,
      });
    } else {
      clearError('will');
    }
  }, [checkWiLength]);

  useEffect(() => {
    if (checkReasLength) {
      setError('joiningCompanyReason', {
        type: 'maxLength',
        message: MESS_ERROR.BASIC_INFO.joiningCompanyReasonLength,
      });
    } else {
      clearError('joiningCompanyReason');
    }
  }, [checkReasLength]);

  useEffect(() => {
    if (joiningPathDescription && isEmpty(joiningPathOptional)) {
      setError('joiningPathOptional', {
        type: 'required',
        message: MESS_ERROR.BASIC_INFO.joiningPath,
      });
    } else {
      clearError('joiningPathOptional');
    }
  }, [joiningPathDescription, joiningPathOptional]);

  useEffect(() => {
    if (retirement === '02' && isEmpty(retirementDate)) {
      setError('retirementDate', {
        type: 'required',
        message: MESS_ERROR.BASIC_INFO.retirementDate,
      });
    } else {
      clearError('retirementDate');
    }
  }, [retirement, retirementDate]);

  useEffect(() => {
    if (retirementDate && retirement !== '02') {
      setError('retirement', {
        type: 'required',
        message: MESS_ERROR.BASIC_INFO.retirement,
      });
    } else {
      clearError('retirement');
    }
  }, [retirement, retirementDate]);
  useEffect(() => {
    if (retirement === '02') {
      setEditing(false);
      if (
        originData.data.retirement !== '02' &&
        ((!isValid() && !isFieldInvalid('retirementDate') && !isFieldInvalid('retirement')) ||
          Object.keys(methods.formState.errors).length > 0)
      ) {
        onOpenRetirement();
      }
    } else {
      setEditing(true);
    }
  }, [retirement, originData?.data]);

  const handleGetSummary = () => {
    const { employeeId } = originData.data;
    const payloadSummaryStaff = {
      id: employeeId,
    };
    dispatch(getSummaryStaff(payloadSummaryStaff));
  };
  const getDataParams = () => {
    const data = getValues();
    const { can1, can2, will1, will2, employeeId, royaltiesOptional: option, royaltiesDescription: description } = data;
    const dataCan = can1 && can2 ? `${can1 || ''}|${can2 || ''}` : can1 || can2;
    const dataWill = will1 && will2 ? `${will1 || ''}|${will2 || ''}` : will1 || will2;

    const {
      employeeId: employeeIdCompare,
      royaltiesOptional: optionCompare,
      royaltiesDescription: descriptionCompare,
    } = originData.dataSub;

    const dataSub = dataPayloadSub({ employeeId, option, description, dataCan, dataWill, data });
    const dataCompareSub = dataPayloadSub({
      employeeId: employeeIdCompare,
      option: optionCompare,
      description: descriptionCompare,
      dataCan: originData.dataSub.can,
      dataWill: originData.dataSub.will,
    });

    const { joiningCompanyReason1, joiningCompanyReason2, joiningCompanyReason3, joiningCompanyReason4 } = data;
    const dataJoiningCompanyReason = [
      joiningCompanyReason1,
      joiningCompanyReason2,
      joiningCompanyReason3,
      joiningCompanyReason4,
    ]
      .filter((reason) => reason)
      .join('|');

    const dataPayload = dataPayloadMain({
      data,
      esResponsibility,
      dataJoiningCompanyReason,
    });
    const dataToCompare = dataPayloadMain({
      data: originData,
      esResponsibility,
      dataJoiningCompanyReason,
    });
    const isDiff = isSameObj({ ...dataToCompare, ...dataCompareSub }, { ...dataPayload, ...dataSub });
    return { dataPayload, dataSub, isDiff };
  };
  useEffect(() => {
    if (isViewWorkflow) {
      if (methods.formState.isValid && isValid()) {
        setIsActiveForm(true);
      } else {
        setIsActiveForm(false);
      }
    }
  }, [methods.formState, isValid()]);
  useEffect(() => {
    if (isActiveForm) {
      const { dataPayload, dataSub } = getDataParams();
      setParamsChildren({
        basicInfo: {
          basicInfo: dataPayload,
          basicInfoSub: dataSub,
        },
      });
    }
  }, [isActiveForm]);
  const handleApprove = () => {
    const { isDiff } = getDataParams();
    if (isDiff) {
      onClose();
      setTimeout(() => {
        handleGetSummary();
      }, 500);
    } else {
      onOpen();
    }
  };
  const onSubmit = useCallback(
    ({ moreParams }) => {
      const data = getValues();
      const { dataPayload, dataSub } = getDataParams();
      const handleSuccessSummary = () => {
        onClose();
        setTimeout(() => {
          handleGetSummary();
        }, 500);
        if (originData.data.employeeId !== data.employeeId) {
          // setTimeout(() => {
          //   window.location.href = `${ROUTES.summary}/${data.employeeId}`;
          // }, 500);
        }
      };
      const paramsData = {
        basicInfo: dataPayload,
        basicInfoSub: dataSub,
        ...moreParams,
      };
      const payload = {
        data: paramsData,
        id: originData.data.employeeId,
        onSuccess: modeForm === 'summary' ? handleSuccessSummary : onSuccess,
      };

      dispatch(createBasicInfo(payload));
    },
    [getValues, esResponsibility],
  );
  const { handleSubmit } = methods;
  const conditionEnbledForm = canEdit(ID_KEY[7]) && Boolean(modeForm === 'create' || editing);

  const propsUI = {
    methods,
    handleSubmit,
    isValid,
    onOpen,
    originData,
    onSuccess,
    navigate,
    conditionEnbledForm,
    watch,
    editing,
    isFieldInvalid,
    esResponsibility,
    ShowError,
    setEsResponsibility,
    onClose,
    modeForm,
    tForm,
    isOpen,
    onCloseModal,
    onSubmit,
    updatedUser,
    updatedDatetime,
    isOpenRetirement,
    onOpenRetirement,
    onCloseRetirement,
    setValue,
    tTable,
    royaltiesOptional,
    handleApprove,
  };
  return (
    <ViewCRUD {...propsUI} isViewWorkflow={isViewWorkflow} isEditWorkflow={isEditWorkflow} isEditing={isEditing} />
  );
}
