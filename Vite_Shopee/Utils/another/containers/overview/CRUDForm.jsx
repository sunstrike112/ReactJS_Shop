import { useDisclosure } from '@chakra-ui/react';
import { convertToNestedObject } from 'dhm/components/Modal/elements/approveModal';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { STATUS } from 'dhm/utils/constants/type';
import { isSameObj } from 'dhm/utils/helpers/condition';
import { formatDateISO } from 'dhm/utils/helpers/format';
import Resizer from 'dhm/utils/helpers/resizeImage';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ViewForm } from './ViewForm';
import { getDataOverview } from './config';
import { ValidationError } from './validate';

export function CRUDFormOverview({
  onClose = () => {},
  originData = {},
  modeFeature = 'origin',
  isEditing = false,
  setIsActiveForm = () => {},
  setParamsChildren = () => {},
  isActiveForm = false,
}) {
  const isViewWorkflow = modeFeature === 'workflow';
  const isEditWorkflow = ({ track = isEditing, other }) => (isViewWorkflow ? track : other);
  const inputFile = useRef(null);
  const { employeeId: employeeUrl } = useParams();
  const employeeId = isViewWorkflow ? originData?.employeeId : employeeUrl;
  const [avatar, setAvatar] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [status, setStatus] = useState({
    isNoConcern: STATUS.NO_CONCERN !== originData.status,
    isLowUrgent: STATUS.LOW_URGENT !== originData.status,
    isHighUrgent: STATUS.HIGH_URGENT !== originData.status,
  });
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { tOverviewInfo: t } = useContext(LanguageContext);
  const { heightApp } = useContext(AppContext);
  const methods = useForm({
    defaultValues: {
      ...originData,
      employeeId,
      noConcern: originData.status === STATUS.NO_CONCERN,
      lowUrgent: originData.status === STATUS.LOW_URGENT,
      highUrgent: originData.status === STATUS.HIGH_URGENT,
      whatTodo: originData?.whatTodo || '',
      whenEnd: originData?.whenEnd || '',
    },
    mode: 'onChange',
  });
  const { getValues, setValue, handleSubmit, watch } = methods;
  useEffect(() => {
    if (isViewWorkflow) {
      if (Object.keys(originData).length) {
        methods.reset({
          ...originData,
          employeeId,
          noConcern: originData.status === STATUS.NO_CONCERN,
          lowUrgent: originData.status === STATUS.LOW_URGENT,
          highUrgent: originData.status === STATUS.HIGH_URGENT,
          whatTodo: originData?.whatTodo || '',
          whenEnd: originData?.whenEnd || '',
        });
      }
    }
  }, [originData]);
  const [actionRequiredWatch, esManagerWatch, statusWatch, whenEndWatch, whatTodoWatch] = watch([
    'actionRequired',
    'esManager',
    'status',
    'whenEnd',
    'whatTodo',
  ]);
  const { isValid, ShowError, clearError, setError } = DHMHook.useSetError();
  const NO_SELECT_OPTION = {
    value: '',
    label: t('notSelect'),
  };
  const {
    listEsMngPred,
    staffSummary,
    loadingListEsManger,
    getOverviewInfoAction,
    updateOverviewInfoAction,
    getEsMngPredAction,
  } = ServicesOverviewInfo();
  const [listEsManagerPred, setListEsManagerPred] = useState(
    [...listEsMngPred.data]?.map((item) => ({
      value: item.userCode,
      label: item.esMngPred,
    })),
  );
  const handleNoConcern = () => {
    setStatus({
      isNoConcern: false,
      isLowUrgent: true,
      isHighUrgent: true,
    });
    setValue('status', STATUS.NO_CONCERN);
  };
  useEffect(() => {
    if (originData?.esManager === (watch('esManager') || '')) {
      setValue('predecessorEndDate', originData.predecessorEndDate);
      setValue('esManagerStartDate', originData.esManagerStartDate);
    } else {
      const cacuDateEnd = new Date(watch('esManagerStartDate'));
      cacuDateEnd.setDate(cacuDateEnd.getDate());
      setValue('predecessorEndDate', watch('esManagerStartDate') ? formatDateISO(cacuDateEnd) : null);
    }
  }, [watch('esManager'), watch('esManagerStartDate')]);
  useEffect(() => {
    if (originData?.esManager !== (watch('esManager') || '')) {
      setValue('predecessor', originData?.esManager);
    } else {
      setValue('predecessor', originData?.predecessor);
    }
  }, [watch('esManager')]);
  const handleLowUrgent = () => {
    setStatus({
      isNoConcern: true,
      isLowUrgent: false,
      isHighUrgent: true,
    });
    setValue('status', STATUS.LOW_URGENT);
  };
  const handleHighUrgent = () => {
    setStatus({
      isNoConcern: true,
      isLowUrgent: true,
      isHighUrgent: false,
    });
    setValue('status', STATUS.HIGH_URGENT);
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    });

  const handleUploadAvatar = async (event) => {
    const file = event.target.files[0];
    setAvatar(await resizeFile(file));
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgPreview(reader.result);
    });
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getEsMngPredAction({
      params: {
        deleteFlg: 0,
        isHistory: false,
        sortType: 'desc',
        isAll: true,
      },
    });
  }, []);
  const getDataParams = () => {
    const data = getValues();
    const dataPayload = getDataOverview({ employeeId, data, actionRequiredWatch, originData, avatar, esManagerWatch });
    const dataToCompare = getDataOverview({
      employeeId,
      data: originData,
      actionRequiredWatch,
      originData,
      avatar,
      esManagerWatch,
    });
    const isDiff = isSameObj(dataPayload, dataToCompare) && imgPreview === null;
    return { dataPayload, isDiff };
  };
  const handleApprove = () => {
    const { isDiff } = getDataParams();
    if (isDiff) {
      onClose();
      setTimeout(() => {
        getOverviewInfoAction({ employeeId });
      }, 500);
    } else {
      onOpen();
    }
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
      const { dataPayload } = getDataParams();
      setParamsChildren({
        overview: dataPayload,
      });
    }
  }, [isActiveForm]);
  const onSubmit = useCallback(
    ({ moreParams }) => {
      const { dataPayload } = getDataParams();
      const handleSuccess = () => {
        setTimeout(() => {
          onClose();
          getOverviewInfoAction({ employeeId });
        }, 500);
      };
      const payload = {
        data: { ...dataPayload, ...convertToNestedObject(moreParams) },
        onSuccess: handleSuccess,
      };

      updateOverviewInfoAction(payload);
    },
    [getValues, esManagerWatch, actionRequiredWatch, avatar, imgPreview],
  );
  const handleGetListEsMngPred = useCallback(
    debounce(() => {
      getEsMngPredAction({
        params: {
          deleteFlg: 0,
          isHistory: false,
          sortType: 'desc',
          isAll: true,
        },
      });
    }, 500),
    [],
  );
  useEffect(() => {
    setListEsManagerPred(
      [...listEsMngPred.data]?.map((item) => ({
        value: item.userCode,
        label: item.esMngPred,
      })),
    );
  }, [listEsMngPred]);
  return (
    <>
      <ViewForm
        methods={methods}
        handleSubmit={handleSubmit}
        isValid={isValid}
        onOpen={onOpen}
        inputFile={inputFile}
        employeeId={employeeId}
        imgPreview={imgPreview}
        originData={originData}
        NO_SELECT_OPTION={NO_SELECT_OPTION}
        handleGetListEsMngPred={handleGetListEsMngPred}
        loadingListEsManger={loadingListEsManger}
        listEsManagerPred={listEsManagerPred}
        t={t}
        actionRequiredWatch={actionRequiredWatch}
        handleHighUrgent={handleHighUrgent}
        status={status}
        onClose={onClose}
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        ShowError={ShowError}
        handleUploadAvatar={handleUploadAvatar}
        staffSummary={staffSummary}
        heightApp={heightApp}
        handleNoConcern={handleNoConcern}
        handleLowUrgent={handleLowUrgent}
        onSubmit={onSubmit}
        handleApprove={handleApprove}
        watch={watch}
        setValue={setValue}
        isViewWorkflow={isViewWorkflow}
        isEditWorkflow={isEditWorkflow}
        isEditing={isEditing}
      />
      <ValidationError
        statusWatch={statusWatch}
        setError={setError}
        actionRequiredWatch={actionRequiredWatch}
        whenEndWatch={whenEndWatch}
        clearError={clearError}
        whatTodoWatch={whatTodoWatch}
      />
    </>
  );
}
