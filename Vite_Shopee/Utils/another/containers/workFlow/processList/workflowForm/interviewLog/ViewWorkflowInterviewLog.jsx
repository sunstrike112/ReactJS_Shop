/* eslint-disable no-unused-vars */
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import { getDataCreateInterviewLog } from 'dhm/containers/interviewLog/config';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { ServicePolicyProgress } from 'dhm/store/policyProgress/services';
import { ServiceWorkflow } from 'dhm/store/workflow/services';
import { MESS_ERROR } from 'dhm/utils/constants/messageId';
import { TYPE_SELECT, WF_STATUS, YEAR_RANGE } from 'dhm/utils/constants/select';
import { STATUS } from 'dhm/utils/constants/type';
import { formatDateJP } from 'dhm/utils/helpers/format';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export function ViewWorkflowInterviewLog({ dataProcess }) {
  const { getTobeFYAction } = ServicePolicyProgress();
  const { listEsMngPred, OPTIONS_INTERVIEW_CATEGORY, loadingListEsManger, getEsMngPredAction } = ServicesInterviewLog();
  const {
    detailProcess,
    getDetailProcessAction,
    updateProcessAction,
    getProcessListIncompleteAction,
    getProcessListCompletedAction,
  } = ServiceWorkflow();
  const { employeeId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDenial, onOpen: onOpenDenial, onClose: onCloseDenial } = useDisclosure();
  const { tInterviewLog, tWorkflow, tForm } = useContext(LanguageContext);
  const methods = useForm({
    defaultValues: {
      employeeId,
    },
    mode: 'onChange',
  });

  const [listEsManagerPred, setListEsManagerPred] = useState(
    [...listEsMngPred.data]?.map((item) => ({
      value: item.userCode,
      label: item.esMngPred,
    })),
  );

  const { getValues, handleSubmit, watch } = methods;
  const [dateWatch, nextDateWatch] = watch(['date', 'nextDate']);
  const { isValid, setError, ShowError, clearError } = DHMHook.useSetError();

  const getDataParams = () => {
    const data = getValues();
    const dataPayload = getDataCreateInterviewLog({ data, employeeId });

    return { dataPayload };
  };
  const handleApprove = () => {
    onOpen();
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
    getTobeFYAction({
      params: {
        isHistory: false,
        sortType: 'asc',
        sortColumn: 'codeValue',
        codeListIds: [
          TYPE_SELECT.TOBE_FY,
          TYPE_SELECT.T_RISK,
          TYPE_SELECT.INTERVIEW_CATEGORY,
          TYPE_SELECT.BUSINESS_CATEGORY,
          TYPE_SELECT.RECOGNIZE_PERSON,
        ],
        isAll: true,
      },
    });
    getDetailProcessAction(dataProcess.matterNo);
  }, []);

  useEffect(() => {
    setListEsManagerPred(
      [...listEsMngPred.data]?.map((item) => ({
        value: item.userCode,
        label: item.esMngPred,
      })),
    );
  }, [listEsMngPred]);

  useEffect(() => {
    if (nextDateWatch && new Date(formatDateJP(dateWatch)) >= new Date(formatDateJP(nextDateWatch))) {
      setError('nextDate', {
        type: 'invalid',
        message: MESS_ERROR.INTERVIEW_LOG.nextDate,
      });
    } else {
      clearError('nextDate');
    }
    if (formatDateJP(dateWatch) === null) clearError('nextDate');
  }, [dateWatch, nextDateWatch]);

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

  const handleSubmitProcess = (type, onCloseModal) => {
    const { statusMatter, processMatter, payloadParams, pagination, paginationCompleted } = dataProcess;
    const { dataPayload } = getDataParams();
    const payload = {
      data: {
        matterNos: [dataProcess.matterNo],
        wfStatusId: type,
        processComment: null,
        interviewLog: dataPayload,
      },
      onSuccess: () => {
        if (processMatter)
          getProcessListIncompleteAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: pagination.limit,
              applicant: true,
            },
          });
        else
          getProcessListCompletedAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: paginationCompleted.limit,
              approverRequest: statusMatter === STATUS.DONE,
            },
          });
        onCloseModal();
      },
    };
    updateProcessAction(payload);
  };

  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <Flex width='80%' justify='space-between' alignItems='flex-start' gap={2} mt={4}>
            <Box width='200px'>
              <InputFormDate
                name='date'
                label={tInterviewLog('date')}
                methods={methods}
                minDate={new Date()}
                max={new Date(YEAR_RANGE.MAX)}
                showIcon
              />
            </Box>
            <Box width='200px'>
              <SelectForm
                options={listEsManagerPred}
                methods={methods}
                name='esManagerCode'
                label={tInterviewLog('esStaff')}
                onInputChange={() => handleGetListEsMngPred()}
                isLoading={loadingListEsManger}
              />
            </Box>
            <Box width='200px'>
              <SelectForm
                options={OPTIONS_INTERVIEW_CATEGORY}
                methods={methods}
                name='category'
                label={tInterviewLog('inteviewCategory')}
              />
            </Box>
          </Flex>
          <Flex mt={4} flexDirection='column'>
            <Box width='100%'>
              <FormTextArea label={tInterviewLog('content')} name='content' resize='none' height={550} rows={4} />
            </Box>
          </Flex>
          <Box mt={4}>
            <InputFormDate
              name='nextDate'
              width='200px'
              label={tInterviewLog('dateOfNextInterview')}
              methods={methods}
              minDate={new Date()}
              max={new Date(YEAR_RANGE.MAX)}
              showIcon
            />
          </Box>
          <ShowError name='nextDate' mt='10px' />
          <Flex mt={10} gap='10px' justifyContent='end'>
            <>
              {dataProcess.isShowButton.approved && <DHMButton type='submit'>{tWorkflow('approval')}</DHMButton>}
              {dataProcess.isShowButton.reject && (
                <DHMButton type='submit' buttonType='denial'>
                  {tWorkflow('denial')}
                </DHMButton>
              )}
            </>
            <ConfirmModal
              isOpen={isOpen}
              onConfirm={() => handleSubmitProcess(WF_STATUS.APPROVAL, onClose)}
              onCancel={onClose}
              type='update'
            />
            <ConfirmModal
              isOpen={isOpenDenial}
              onConfirm={() => handleSubmitProcess(WF_STATUS.DENIAL, onCloseDenial)}
              onCancel={onCloseDenial}
              type='update'
            />
          </Flex>
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
