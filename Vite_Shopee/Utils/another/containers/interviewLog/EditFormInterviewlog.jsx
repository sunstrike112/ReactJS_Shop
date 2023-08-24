import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import { InputFormDate } from 'dhm/components/Form/elements/Date2';
import { FormTextArea } from 'dhm/components/Form/elements/FormTextArea';
import { SelectForm } from 'dhm/components/Form/elements/Select';
import { ApproveModal } from 'dhm/components/Modal/elements/approveModal';
import { WrapperForm } from 'dhm/containers/auth/styled';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { DHMHook } from 'dhm/hooks/index';
import { ServicesInterviewLog } from 'dhm/store/interviewLog/services';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { ServicePolicyProgress } from 'dhm/store/policyProgress/services';
import { MESS_ERROR } from 'dhm/utils/constants/messageId';
import { TYPE_SELECT, YEAR_RANGE } from 'dhm/utils/constants/select';
import { COLORS } from 'dhm/utils/constants/style';
import { isSameObj } from 'dhm/utils/helpers/condition';
import { formatDateJP } from 'dhm/utils/helpers/format';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDataEditInterviewLog } from './config';

const WrapperFlex = styled(Flex)`
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray_primary};
  }
`;

export function EditFormInterviewlog({
  onClose = () => {},
  originData,
  modeFeature = 'origin',
  isEditing = false,
  setIsActiveForm = () => {},
  setParamsChildren = () => {},
  isActiveForm,
}) {
  const isViewWorkflow = modeFeature === 'workflow';
  const isEditWorkflow = ({ track = isEditing, other }) => (isViewWorkflow ? track : other);
  const { getInterviewLogAction, updateInterviewLogAction, OPTIONS_INTERVIEW_CATEGORY } = ServicesInterviewLog();
  const { listEsMngPred, loadingListEsManger, getEsMngPredAction } = ServicesOverviewInfo();
  const { getTobeFYAction } = ServicePolicyProgress();
  const { employeeId } = useParams();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { tInterviewLog } = useContext(LanguageContext);
  useEffect(() => {
    if (isViewWorkflow) {
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
    }
  }, []);
  const defaultValues = {
    employeeId,
    date: originData.date,
    esManagerCode: originData.esManagerCode,
    category: originData.category,
    content: originData.content,
    nextDate: originData.nextDate,
  };
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const [listEsManagerPred, setListEsManagerPred] = useState(
    [...listEsMngPred.data]?.map((item) => ({
      value: item.userCode,
      label: item.esMngPred,
    })),
  );
  const { getValues, handleSubmit, watch } = methods;

  useEffect(() => {
    if (isViewWorkflow) {
      if (Object.keys(originData).length) {
        methods.reset({
          employeeId,
          date: originData.date,
          esManagerCode: originData.esManagerCode,
          category: originData.category,
          content: originData.content,
          nextDate: originData.nextDate,
        });
      }
    }
  }, [originData]);

  const [dateWatch, nextDateWatch] = watch(['date', 'nextDate']);
  const { isValid, setError, clearError, ShowError } = DHMHook.useSetError();
  const isDisabledDate = useMemo(
    () => formatDateJP(new Date()) > formatDateJP(new Date(originData.date)),
    [originData],
  );
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
  }, [dateWatch, nextDateWatch]);

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
  const getDataParams = () => {
    const data = getValues();
    const dataPayload = getDataEditInterviewLog({ data, employeeId, originData });
    const dataToCompare = getDataEditInterviewLog({ data: originData, employeeId, originData });
    const isDiff = isSameObj(dataToCompare, dataPayload);
    return { dataPayload, isDiff };
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
        interviewLog: dataPayload,
      });
    }
  }, [isActiveForm]);

  const handleApprove = () => {
    const { isDiff } = getDataParams();
    if (isDiff) {
      onClose();
      setTimeout(() => {
        getInterviewLogAction({
          params: {
            employeeId,
            isHistory: false,
            sortColumn: 'date',
            sortType: 'desc',
            isAll: false,
            limit: 10,
            page: 1,
          },
        });
      }, 500);
    } else {
      onOpen();
    }
  };
  const onSubmit = useCallback(
    ({ moreParams }) => {
      const { dataPayload } = getDataParams();
      const handleSuccess = () => {
        onClose();
        setTimeout(() => {
          getInterviewLogAction({
            params: {
              employeeId,
              isHistory: false,
              sortColumn: 'date',
              sortType: 'desc',
              isAll: false,
              limit: 10,
              page: 1,
            },
          });
        }, 500);
      };
      const payload = {
        data: { ...dataPayload, ...moreParams },
        onSuccess: handleSuccess,
      };

      updateInterviewLogAction(payload);
    },
    [getValues, originData],
  );
  return (
    <Box position='relative'>
      <FormProvider {...methods}>
        <WrapperForm
          onSubmit={handleSubmit(() => {
            if (isValid()) handleApprove();
          })}
        >
          <Flex flexDirection='column' justify='space-between'>
            <WrapperFlex flexDirection='column' overflow='auto' pr='10px'>
              <Flex width='80%' justify='space-between' alignItems='flex-start' gap={2} mt={4}>
                <Box width='200px'>
                  <InputFormDate
                    name='date'
                    label={tInterviewLog('date')}
                    methods={methods}
                    minDate={new Date()}
                    max={new Date(YEAR_RANGE.MAX)}
                    showIcon
                    isClearable={!isDisabledDate}
                    pointerEvents={isDisabledDate && 'none'}
                    background={isDisabledDate && COLORS.gray_400}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
                <Box width='200px'>
                  <SelectForm
                    options={listEsManagerPred}
                    methods={methods}
                    name='esManagerCode'
                    label={tInterviewLog('esStaff')}
                    originValue={originData.esManagerCode}
                    onInputChange={() => handleGetListEsMngPred()}
                    isLoading={loadingListEsManger}
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
                <Box width='200px'>
                  <SelectForm
                    options={OPTIONS_INTERVIEW_CATEGORY}
                    methods={methods}
                    name='category'
                    label={tInterviewLog('inteviewCategory')}
                    originValue={originData.category}
                    isDisabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
              </Flex>
              <Flex mt={4} flexDirection='column'>
                <Box width='100%'>
                  <FormTextArea
                    label={tInterviewLog('content')}
                    name='content'
                    resize='none'
                    minHeight={isViewWorkflow ? 'calc(100vh - 475px)' : 'calc(100vh - 420px)'}
                    rows={4}
                    disabled={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                    onlyView={isEditWorkflow({
                      track: !isEditing,
                      other: false,
                    })}
                  />
                </Box>
              </Flex>
              <Box mt={4}>
                <InputFormDate
                  name='nextDate'
                  width='200px'
                  label={tInterviewLog('dateOfNextInterview')}
                  methods={methods}
                  max={new Date(YEAR_RANGE.MAX)}
                  minDate={new Date()}
                  showIcon
                  disabled={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                  onlyView={isEditWorkflow({
                    track: !isEditing,
                    other: false,
                  })}
                />
              </Box>
              <ShowError name='nextDate' mt='10px' />
            </WrapperFlex>
            {!isViewWorkflow && (
              <Flex gap='10px' justifyContent='end'>
                <>
                  <CloseButton handleClose={onClose} />
                  <DHMButton text='update' type='submit' />
                </>

                <ApproveModal
                  typeBusinessDivision='面談ログ'
                  isOpen={isOpen}
                  onConfirm={(dataWF) => {
                    onSubmit({
                      moreParams: dataWF,
                    });
                    onCloseModal();
                  }}
                  onCancel={onCloseModal}
                />
              </Flex>
            )}
          </Flex>
        </WrapperForm>
      </FormProvider>
    </Box>
  );
}
